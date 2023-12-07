const { Schema, model } = require("mongoose");
const { isURL } = require("validator");

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: {
        value: true,
        message: "Поле имя является обязательным",
      },
      minlength: [2, "Минимальная длина 2 символа"],
      maxlength: [30, "Максимальная длина 30 символов"],
    },
    link: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: "Некорректный URL",
      },
      required: [true, "Поле ссылка является обязательным"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        default: [],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("card", cardSchema);
