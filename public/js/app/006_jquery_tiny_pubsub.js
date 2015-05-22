/*! Tiny Pub/Sub - v0.7.0 - 2013-01-29
* https://github.com/cowboy/jquery-tiny-pubsub
* Copyright (c) 2013 "Cowboy" Ben Alman; Licensed MIT */
(function (jQuery) {
    
    var o = jQuery({});
    
    jQuery.subscribe = function () {
        o.on.apply(o, arguments);
    };
    
    jQuery.unsubscribe = function () {
        o.off.apply(o, arguments);
    };
    
    jQuery.publish = function () {
        o.trigger.apply(o, arguments);
    };

}(jQuery));