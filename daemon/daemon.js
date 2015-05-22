var keystone = require('keystone'),
    checkLive = require('./checkLive'),
    chat = require('./chat');

var Daemon = function() {
  this.daemons = [
    checkLive,
    chat
  ];
};

Daemon.prototype.exec = function () {
  // body...
  for(var i in this.daemons) {
    var daemon = this.daemons[i];
    if(daemon && typeof daemon === "function") {
      daemon(function(err, message) {
        if(err) { console.log(message); }
      });
    }
  }
};

exports = module.exports = new Daemon();
