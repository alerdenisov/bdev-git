var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Tag = new keystone.List('Tag', {
	map: { name: 'short' },
	autokey: { path: 'slug', from: 'short', unique: true }
});

Tag.add({
	short: { type: String, required: true }
});


Tag.relationship({ ref: 'Channel',     path: 'channels', refPath: 'tags' });
Tag.relationship({ ref: 'User',    		 path: 'users',    refPath: 'tags' });
Tag.relationship({ ref: 'ChatMessage', path: 'messages', refPath: 'tags' });

Tag.defaultColumns = 'short';



var deepPopulate = require('mongoose-deep-populate');
Tag.schema.plugin(deepPopulate);

Tag.register();
