const router = require('express').Router();

const validator = require('../middlewares/validator');

const { getMovies, saveMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validator.saveMovie, saveMovie);
router.delete('/:id', validator.deleteMovie, deleteMovie);

module.exports = router;
