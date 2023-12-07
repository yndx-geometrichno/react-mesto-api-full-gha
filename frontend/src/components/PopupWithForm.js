import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import usePopupClose from "../hooks/usePopupClose";

export default function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onSubmit,
  buttonText,
  isValid,
}) {
  const appContext = useContext(AppContext);
  usePopupClose(isOpen, appContext.onClose);

  function handleSubmit(e) {
    e.preventDefault(e);
    onSubmit();
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__header">{title}</h2>
        <form
          name={name}
          action="#"
          className="popup__form popup__form-profile"
          noValidate
          onSubmit={handleSubmit}
        >
          {children}
          <button
            type="submit"
            value="Сохранить"
            className={`popup__save-btn ${
              !isValid && "popup__save-btn_type_disabled"
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__close-btn"
          onClick={appContext.onClose}
        />
      </div>
    </div>
  );
}
