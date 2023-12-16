const { Joi } = require("celebrate");

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const userIdValidation = {
  params: {
    userId: Joi.string().hex().length(24).required(),
  },
};

const updateUserInfoValidation = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
};

const updateUserAvatarValidation = {
  body: Joi.object().keys({
    avatar: Joi.string().regex(URL_REGEX).required(),
  }),
};

const cardIdValidation = {
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
};

const createCardValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(URL_REGEX).required(),
  }),
};

module.exports = {
  userIdValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
  cardIdValidation,
  createCardValidation,
};
