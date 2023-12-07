const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const userRouter = require("./users");
const cardRouter = require("./cards");
const auth = require("../middleware/auth");
const { createUser, login } = require("../controllers/users");
const ApiError = require("../error/ApiError");

const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).default("Жак-Ив Кусто"),
      about: Joi.string().min(2).max(30).default("Исследователь"),
      avatar: Joi.string()
        .regex(URL_REGEX)
        .default(
          "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
        ),
    }),
  }),
  createUser
);
router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);
router.get("/signout", (req, res) => {
  res.clearCookie("token").send({ message: "Вы вышли из профиля" });
});
router.use("/users", auth, userRouter);
router.use("/cards", auth, cardRouter);
router.use("*", auth, (req, res, next) =>
  next(ApiError.badRequest("This page is not exist"))
);

module.exports = router;
