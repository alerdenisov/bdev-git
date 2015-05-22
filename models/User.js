var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
* User Model
* ==========
*/

var User = new keystone.List('User', {
    autokey: { path: 'slug', from: 'name', unique: true }
});

User.add(
    {
        name: { type: Types.Name, required: true, index: true },
        email: { type: Types.Email, initial: true, required: true, index: true },
        password: { type: Types.Password, initial: true, required: true },
        tags: { type: Types.Relationship, ref: 'Tag', many: true }
    },
	'Permissions', {
        isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
	},
	'Profile', {
		cover:  { type: Types.CloudinaryImage },
		avatar: { type: Types.CloudinaryImage },
		about: {
			short: { type: Types.Html, wysiwyg: true, height: 150 },
			long:  { type: Types.Html, wysiwyg: true, height: 150  }
		}
	});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

User.schema.post('save', function (user) {
    var Tag = keystone.list('Tag');
    var countQ = Tag.model.findOne().where('short', user.slug).populate('users');
    countQ.exec(function(err, tag) {
        if (!tag) {
            // create new one tag for user
            var userTag = new Tag.model({
                short: user.slug
            });

            userTag.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                }

                user.tags.push(userTag);
                user.save(function(err) {});

            });
        }
    });
});


User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Channel', path: 'channels', refPath: 'user' });

User.relationship({ ref: 'Tag', path: 'tags', refPath: 'users' });

User.defaultColumns = 'name, email, isAdmin';

User.register();
