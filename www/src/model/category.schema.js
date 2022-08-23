const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

categorySchema.index({ name: 'text' });

const Category = model('category', categorySchema);

module.exports = { Category };
