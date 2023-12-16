const router = require("express").Router();
const { celebrate } = require("celebrate");
const {
  getUsers,
  getUser,
  getMe,
  updateUserAvatar,
  updateUserInfo,
} = require("../controllers/users");
const {
  userIdValidation,
  updateUserInfoValidation,
  updateUserAvatarValidation,
} = require("../utils/validationRules");

router.get("/", getUsers);
router.get("/me", getMe);
router.get("/:userId", celebrate(userIdValidation), getUser);
router.patch("/me", celebrate(updateUserInfoValidation), updateUserInfo);
router.patch(
  "/me/avatar",
  celebrate(updateUserAvatarValidation),
  updateUserAvatar
);

module.exports = router;
