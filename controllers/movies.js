const Movie = require('../models/movie');

const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    return res.send({ movies });
  } catch (e) {
    return next(e);
  }
};

module.exports.saveMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const owner = req.user._id;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink: trailer,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    });
    return res.send({ movie });
  } catch (e) {
    return next(e);
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) throw new NotFoundError('Фильм не найден');
    if (movie.owner.toString() !== req.user._id) throw new ForbiddenError('Нет хватает прав');
    await movie.deleteOne();
    return res.send({ movie });
  } catch (e) {
    return next(e);
  }
};
