var keystone = require('keystone');

exports = module.exports = function(cb) {
  var exec = function() {
    var channelsQ = keystone.list('Channel').model.find();

    channelsQ.exec(function(err, channels) {
      if(err || !channels.length) {
        if(cb) cb(true, "Can't find any channel");
      }

      for(var c in channels) {
        var channel = channels[c];
        var channelLive = channel.isLive;
      }
    });
  }
  setInterval(function() { exec(); }, 1000);
};
