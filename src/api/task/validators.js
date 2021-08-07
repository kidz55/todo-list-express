const { check, validationResult } = require('express-validator')

exports.validateTask = [
  check('title')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Task title can\' be empty')
    .bail(),
  check('status')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Status can\' be empty')
    .bail(),
  check('deadLine')
    .trim()
    .escape()
    .not()
    .isDate()
    .withMessage('Deadline is not a date')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) { return res.status(422).json({ errors: errors.array() }) }
    next()
  }
]
