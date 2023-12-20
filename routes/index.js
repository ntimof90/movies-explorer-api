const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');

router.use('/users/me', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
