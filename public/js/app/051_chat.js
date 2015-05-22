var ChatMessage = function(author, text) {
    this.text = text;
	this.tags = this.getTags();
    this.author = author;
};

ChatMessage.prototype.getHtml = function () {
    var tmpl = '' +
    '<div class="chat-panel__list__item layout horizontal center">' +
        '<div class="avatar avatar_small">' +
            '<img src="{0}" alt="" />' +
        '</div>' +
        '<div class="chat-panel__list__item__content flex">' +
            '<p>{1}: {2}</p>' +
        '</div>' +
    '</div> ';

    return String.format(tmpl, this.getAvatarSrc(), this.getNickname(), this.getHtmlText());
};

ChatMessage.prototype.getAvatarSrc = function () {
	var url = "";
	if(this.author && this.author.avatar && this.author.public_id) {
		url = $.cloudinary.url(this.author.avatar.public_id, {width: 100, height: 100, crop: "fill"});
	}
    return url;
};

ChatMessage.prototype.getNickname = function() {
    var nickTmpl = '<a href="/profile/{0}" class="user">{1}</a>';
    return String.format(nickTmpl, this.author._id, this.author.name.first + " " + this.author.name.last);
};

ChatMessage.parseText = function(text) {
    // template for wrap every tag inside text
    var tagTmpl = '<a href="/tag/$1" class="tag">$1</a>';
    // regex patter to find every words that starts with #
    var regexp = new RegExp('#([^\\s]+)', 'g');
    // find hashtags inside text
    var text = text.replace(regexp, tagTmpl);
    // return final string
    return text;
};

ChatMessage.prototype.getHtmlText = function() {
    return ChatMessage.parseText(this.text);
};

ChatMessage.prototype.getTags = function() {
	var regexp = new RegExp('#([^\\s]+)', 'g');
	return this.text.match(regexp);
}

// Chat class
var Chat = function () {
    this.messages = [];
    this.socket = io();

    (function setupSocket() {
        var chat = this;
        // register in chat server
        chat.socket.emit('chat.assign', chatUserToken);

        // listen socket messages
        chat.socket.on('chat.message', function (user, msg) {
            // work with chat message received from server
            chat.addMessage(user, msg); 
        });
    }.bind(this))();
};

Chat.prototype.addMessage = function (author, text) {
    var message = new ChatMessage(author, text);
    this.messages.push(message);
    $.publish('chat', message);
};

Chat.prototype.sendMessage = function(text) {
    // parse tags inside text helper
    var getChatTags = function(rawChat) {
        var regexp = new RegExp('#([^\\s]+)', 'g');
        var tags = rawChat.match(regexp);

        if (tags && tags.length) {
            tags = tags.map(function(s) { return s.slice(1); });
        }

        return tags;
    };

    // collect every tag inside chat text
    var tags = getChatTags(text);

    // send message to server
    this.socket.emit('chat.message', tags, text);
};


var ChatInput = function($obj, tags) {
    this.el = $obj;
    this.tags = tags || [];
};

ChatInput.prototype.getBaseString = function() {
    final = "";
    for (var i = 0; i < this.tags.length; i++) {
        var tag = this.tags[i];
        final += "#" + tag + " ";
    }

    return final;
};

ChatInput.prototype.getMessage = function() {
    return this.el.val();
};

ChatInput.prototype.reset = function() {
    this.el.val(this.getBaseString());
};

ChatInput.prototype.isClean = function() {
    return this.el.val() === this.getBaseString();
};

ChatInput.prototype.isFocus = function() {
    return this.el.is(":focus");
};

ChatInput.prototype.focusOut = function() {
    this.el.focusout();
};

ChatInput.prototype.focusIn = function() {
    this.el.focus();
};

$(function () {
    $.subscribe('chat', function (_, message) {
		$('.chat-panel').each(function(i, panel) { 
			var dataTags = $(panel).data('chat-tag');
			if(dataTags) {
				var panelTags = $(panel).data('chat-tag').split(";");
				for (var i in message.tags) {
					if (panelTags.indexOf(message.tags[i]) !== -1) {
						var list = $(panel).find('.chat-panel__list');
						list.prepend(message.getHtml());
						return true;
					}
				}
			} else {
				var list = $(panel).find('.chat-panel__list');
				list.prepend(message.getHtml());
			}
		});
        //
        //$('.chat-panel__list').prepend($(message.getHtml()));
    });

    var chat = new Chat();
    var chatInput = new ChatInput($("#chat"));

    // setup ui for send msg
    // catch enter key event
    shortcut.add('enter', function () {
        if (chatInput.isFocus() && !chatInput.isClean()) {
            chat.sendMessage(chatInput.getMessage());
            chatInput.reset();
        } else {
            chatInput.focusIn();
        }
    });

    // catch click on button
    $('.chat__button').click(function () {
        if (!chatInput.isClean()) {
            chat.sendMessage(chatInput.getMessage());
            chatInput.reset();
        }
        return false;
    });

    $('.chat-panel').livequery(
        function() {
            // load by ajax last 10 messages
			var container = $(this).find('.chat-panel__list');
            var tags = $(this).data('chat-tag');//.split(";");
			console.log(tags);
            var url = "/json/chat";
    
            var query = {
                func: "messages"
            };
    
            if (tags) { query["tags"] = tags; }
    
            $.get(url, query).done(function (data) {
				console.log(data);
				if (data.data && data.data.results) {
					for (var i = 0; i < data.data.results.length; i++) {
						console.log(data.data.results[i]);
						var message = new ChatMessage(data.data.results[i].author, data.data.results[i].text);
						container.append(message.getHtml());
						
					}
				}
			});
        }
    );

});
