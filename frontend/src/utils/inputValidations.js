export const cardName_validation = {
  name: "cardName",
  type: "text",
  id: "cardName-input",
  placeholder: "Название",
  className: "popup__input_type_card-name",
  validation: {
    required: {
      value: true,
      message: "Поле не может быть пустым",
    },
    minLength: {
      value: 2,
      message: "Минимальная длина - 2 символа",
    },
    maxLength: {
      value: 30,
      message: "Максимальная длина - 30 символов",
    },
  },
};

export const url_validation = {
  name: "url",
  type: "url",
  id: "url-input",
  placeholder: "Ссылка на картинку",
  className: "popup__input_type_url",
  validation: {
    required: {
      value: true,
      message: "Поле не может быть пустым",
    },
    pattern: {
      value:
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
      message: "Введите корректный URL",
    },
  },
};

export const profileName_validation = {
  name: "profileName",
  type: "text",
  id: "profileName-input",
  placeholder: "Ваше имя",
  className: "popup__input_type_profile-name",
  validation: {
    required: {
      value: true,
      message: "Поле не может быть пустым",
    },
    minLength: {
      value: 2,
      message: "Минимальная длина - 2 символа",
    },
    maxLength: {
      value: 40,
      message: "Максимальная длина - 40 символов",
    },
  },
};

export const about_validation = {
  name: "about",
  type: "text",
  id: "about-input",
  placeholder: "Расскажите о себе",
  className: "popup__input_type_about",
  validation: {
    required: {
      value: true,
      message: "Поле не может быть пустым",
    },
    minLength: {
      value: 2,
      message: "Минимальная длина - 2 символа",
    },
    maxLength: {
      value: 200,
      message: "Максимальная длина - 200 символов",
    },
  },
};

export const avatar_validation = {
  name: "avatar",
  type: "url",
  id: "url-avatar-input",
  placeholder: "Ссылка на картинку",
  className: "popup__input_type_url",
  validation: {
    required: {
      value: true,
      message: "Поле не может быть пустым",
    },
    pattern: {
      value:
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
      message: "Введите корректный URL",
    },
  },
};
