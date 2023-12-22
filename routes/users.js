const router = require('express').Router();

const validator = require('../middlewares/validator');

const { findMe, updateMe } = require('../controllers/users');

router.get('/', findMe);
router.patch('/', validator.updateMe, updateMe);

module.exports = router;
