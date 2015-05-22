String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };

$(function() {
  console.log("Socket init");
  var socket = io();
  console.log(socket);

  var $chat = $("#chat");
  $.noty.defaults = {
    layout: 'topRight',
    theme: 'defaultTheme',
    type: 'alert',
    text: '', // can be html or string
    dismissQueue: true, // If you want to use queue feature set this true
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
      open: {height: 'toggle'},
      close: {height: 'toggle'},
      easing: 'swing',
      speed: 500 // opening & closing animation speed
    },
    timeout: 3500, // delay for closing event. Set false for sticky notifications
    force: true, // adds notification to the beginning of queue when set to true
    modal: false,
    maxVisible: 10, // you can set max visible notification for dismissQueue true option,
    killer: false, // for close all notifications before show
    closeWith: ['click'], // ['click', 'button', 'hover']
    callback: {
      onShow: function() {},
      afterShow: function() {},
      onClose: function() {},
      afterClose: function() {}
    },
    buttons: false // an array of buttons
  };

  function resetChatInput() {
    final = "";
    for (var i = 0; i < pageTags.length; i++) {
      var tag = pageTags[i];
      final += "#" + tag + " ";
    }

    $chat.val(final);
  }

  function chatMessage(msg) {

    var getChatTags = function (rawChat) {
      var regexp = new RegExp('#([^\\s]+)','g');
      var tags = rawChat.match(regexp);

      if(tags && tags.length) {
          tags = tags.map(function (s) { return s.slice(1); });
      }

      return tags;
    };

    var text = $chat.val(); //getChatText($chat.val());
    var tags = getChatTags($chat.val());

    socket.emit('chat.message', tags, text);
    resetChatInput();
  }

  function showMessage(user, msg) {
    // body...
    var getChatText = function (rawChat) {
      var regexp = new RegExp('#([^\\s]+)','g');
      var text = rawChat.replace(regexp, '<a href="/tag/$1" class="tag">$1</a>');
      return text;
    };

    var tNickname = '<a href="/profile/{0}">{1}</a>: ';
    // var tTag = '<a href="{0}">#{1}</a> ';
    var tText = '{0}';

    var chatText = '';
    chatText += String.format(tNickname, user.id, user.nickname);
    chatText += String.format(tText, getChatText(msg));

    var n = noty({
      text: chatText,
      timeout: 5000
    });
  }

  socket.on('chat.message', function(user, tags, msg){
    showMessage(user, tags, msg);
  });

  shortcut.add('enter', function() {
    if($chat.is(":focus")) {
      if($chat.val() !== "")
      chatMessage($chat.val());
      $chat.focusout();
    } else {
      $chat.focus();
    }
  });

  socket.emit('chat.assign', chatUserToken);


  $('.chat__button').click(function(){
    chatMessage($chat.val());
    resetChatInput();
    return false;
  });

  resetChatInput();
});
