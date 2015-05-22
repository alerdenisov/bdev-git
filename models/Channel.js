var keystone = require('keystone'),
	  Types = keystone.Field.Types
  , request = require('request');


var Channel = new keystone.List('Channel', {
	map: { name: 'title' }
});

Channel.add({
  user:   { type: Types.Relationship, ref: 'User', require: true },
	title: 			{ type: Types.Text, require: true, unique: false },
  cover:  	  { type: Types.CloudinaryImage },
	whiteCover: { type: Types.Boolean },
  channelId:  { type: Types.Text, require: true, unique: true },
	source:   { type: Types.Select, options: 'twitch, cybergame', default: 'twitch', index: true },
	live: 		{ type: Types.Boolean },
	viewers:  { type: Types.Number },
	tags:     { type: Types.Relationship, ref: 'Tag', many: true }
});

Channel.schema.virtual('isLive').get(function() {
	var model = this;
	var liveCheckFunc = {
		'twitch': function(channel) {
			// check online on twitch tv
			var url = "https://api.twitch.tv/kraken/streams/" + channel;
			request(url, function(err, response, body) {
				var json = JSON.parse(body);
				model.live = !(json.stream == null);
				model.viewers = model.live ? +json.stream.viewers : 0;
				model.save(function(err){ if(err) console.log(err); });
			});
		},
		'cybergame': function(channel) {
			// check online on cybergame
			var url = "http://api.cybergame.tv/w/streams2.php?channel=" + channel;
			request(url, function(err, response, body) {
				var json = JSON.parse(body);
				model.live = json.online == "1";
				model.viewers = model.live ? +json.viewers : 0;
				model.save(function(err){ if(err) console.log(err); });
			});
		}
	};

	if(liveCheckFunc[this.source]) { liveCheckFunc[this.source](this.channelId); }

	return this.live;
});
Channel.schema.virtual('isTwitch').get(function() {
	return this.source == "twitch";
});


Channel.defaultColumns = 'title, user|20%, source|20%, channelId|20%';
Channel.register();
