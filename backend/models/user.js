const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: (props) => `${props.value} - это некорректный Email`,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      default: "Жак-Ив Кусто",
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: "Исследователь",
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
      validate: {
        validator(v) {
          return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(
            v
          );
        },
        message: "Некорректный URL",
      },
    },
  },
  {
    versionKey: false,
  }
);

//  eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email }).select("+password");
    if (!user) {
      throw new Error("WrongUserData");
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new Error("WrongUserData");
      }
      return this.findOne({ email });
    });
  } catch (err) {
    return new Error("WrongUserData");
  }
};

module.exports = model("user", userSchema);
