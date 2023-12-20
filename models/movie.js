const mongoose = require('mongoose');

function urlValidator(v) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(http:\/\/|https:\/\/)(w{3}\.)?[a-zA-Z0-9-.]{2,}\.[a-zA-Z]{2,}\/?[a-zA-Z0-9\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=]*/i;
  return regex.test(v);
}

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: 'Неверный url',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: 'Неверный url',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: 'Неверный url',
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
