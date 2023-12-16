const router = require("express").Router();
const { celebrate } = require("celebrate");
const {
  getCards,
  getCard,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const {
  cardIdValidation,
  createCardValidation,
} = require("../utils/validationRules");

router.get("/", getCards);
router.get("/:cardId", celebrate(cardIdValidation), getCard);
router.post("/", celebrate(createCardValidation), createCard);
router.delete("/:cardId", celebrate(cardIdValidation), deleteCard);
router.put("/:cardId/likes", celebrate(cardIdValidation), likeCard);
router.delete("/:cardId/likes", celebrate(cardIdValidation), dislikeCard);

module.exports = router;
