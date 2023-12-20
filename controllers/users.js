const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { JWT_SECRET, MONGODB_DUPLICATE_ERROR_CODE } = require('../config');

const AuthError = require('../errors/auth-error');
const DbDuplicateError = require('../errors/db-duplicate-error');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hash, name });
    user.password = undefined;
    return res.send({ user });
  } catch (e) {
    let err = e;
    if (e.code === MONGODB_DUPLICATE_ERROR_CODE) err = new DbDuplicateError('Почта занята');
    else if (e.name === 'ValidationError') err = new ValidationError('Переданы некорректные данные');
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) throw new AuthError('Неверный логин и пароль');
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) throw new AuthError('Неверный логин и пароль');
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    return res.send({ token });
  } catch (e) {
    return next(e);
  }
};

module.exports.findMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError('Пользователь не найден');
    return res.send({ user });
  } catch (e) {
    return next(e);
  }
};

module.exports.updateMe = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    if (!user) throw new NotFoundError('Пользователь не найден');
    return res.send({ user });
  } catch (e) {
    let err = e;
    if (e.code === MONGODB_DUPLICATE_ERROR_CODE) err = new DbDuplicateError('Почта занята');
    return next(err);
  }
};
