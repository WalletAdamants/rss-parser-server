const { Schema, model } = require('mongoose');

const creatorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

creatorSchema.index({ name: 'text' });

const Creator = model('creator', creatorSchema);

module.exports = { Creator };
