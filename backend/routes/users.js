const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUser,
  getMe,
  updateUserAvatar,
  updateUserInfo,
} = require("../controllers/users");

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

router.get("/", getUsers);
router.get("/me", getMe);
router.get(
  "/:userId",
  celebrate({
    params: {
      userId: Joi.string().hex().length(24).required(),
    },
  }),
  getUser
);
router.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUserInfo
);
router.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(URL_REGEX).required(),
    }),
  }),
  updateUserAvatar
);

module.exports = router;
