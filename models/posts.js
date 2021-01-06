const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    authorName: {
        required: true,
        type: String,
    },
    authorEmail: {
        required: true,
        type: String,
    },
    likes: [{
        type: ObjectId,
        ref: 'User'
    }],
    replies: [{
        text: String,
        repliedBy: {
            type: ObjectId,
            ref: 'User'
        },
        name: String
    }],
    postedBy: {
        required: true,
        type: ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'postedAt' } })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post