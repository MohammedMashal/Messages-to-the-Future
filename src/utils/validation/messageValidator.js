const { check } = require("express-validator");

const {
  validatorController,
} = require("../../controllers/validatorController");

exports.createMessageValidator = [
  check("recipientEmail")
    .notEmpty()
    .withMessage("recipientEmail can't be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid email address"),
  check("title").notEmpty().withMessage("title can't be empty"),
  check("body").notEmpty().withMessage("body can't be empty"),
  check("scheduledAt")
    .notEmpty()
    .withMessage("scheduledAt can't be empty")
    .bail()
    .isISO8601()
    .withMessage("Invalid Date")
    .bail()
    .custom((value) => {
      const date = new Date(value);
      if (date <= new Date()) {
        throw new Error("scheduledAt must be a future date");
      }
      return true;
    }),
  validatorController,
];
