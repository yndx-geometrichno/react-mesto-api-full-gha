const mongoose = require("mongoose");
const Card = require("../models/card");
const ApiError = require("../error/ApiError");

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.send(cards);
  } catch (err) {
    return next(err);
  }
};

const getCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId).orFail(
      ApiError.notFound("Карточка с указанным _id не найдена.")
    );
    return res.send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner: req.user._id._id });
    return res.status(201).send(await newCard.save());
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return next(
        ApiError.invalid("Переданы некорректные данные при создании карточки")
      );
    }
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findOne({ _id: cardId }).orFail(
      ApiError.notFound("Карточка с указанным _id не найдена.")
    );
    const cardOwnerId = card.owner._id.toString();
    const userId = req.user._id._id;
    if (!cardOwnerId.includes(userId)) {
      return next(
        ApiError.forbidden("У вас недостаточно прав для удаления карточки")
      );
    }
    await card.deleteOne();
    return res.status(200).send({ message: "Данная карточка удалена успешно" });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id._id } },
      { new: true }
    ).orFail(ApiError.notFound("Карточка с указанным _id не найдена."));
    return res
      .status(200)
      .send({ card: updatedCard, message: "Лайк поставлен" });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id._id } },
      { new: true }
    ).orFail(ApiError.notFound("Карточка с указанным _id не найдена."));
    return res.status(200).send({ card: updatedCard, message: "Лайк удален" });
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      return next(ApiError.invalid("Id is not valid"));
    }
    return next(err);
  }
};

module.exports = {
  getCard,
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
