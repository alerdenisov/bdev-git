var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */
var ChatMessage = new keystone.List('ChatMessage', {
	map: { name: 'text' },
	autokey: { path: 'slug', from: 'text', unique: true }
});

ChatMessage.add({
	text:   { type: String, required: true },
	author: { type: Types.Relationship, ref: 'User' },
    tags:   { type: Types.Relationship, ref: 'Tag', many: true },
    createdAt: { type: Types.Datetime, default: Date.now }
});

ChatMessage.defaultColumns = 'text';
ChatMessage.register();
