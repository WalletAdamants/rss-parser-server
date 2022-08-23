const { Schema, model } = require('mongoose');

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      background: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: 'category',
      default: [],
    },
    link: {
      type: String,
      default: '',
    },
    publication_date: {
      type: Date,
      required: true,
    },
    creator: {
      default: '',
      type: Schema.Types.ObjectId,
      ref: 'creator',
    },
  },
  { versionKey: false, timestamps: true }
);

postSchema.index({ title: 'text', description: 'text' });

const Post = model('post', postSchema);

module.exports = { Post };
