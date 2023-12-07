import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function InfoTooltip({ isOpen, message }) {
  const appContext = useContext(AppContext);

  return (
    <div className={`popup popup_type_sign ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        {message ? (
          <>
            <div className="popup__sign_type_fail"></div>
            <h2 className="popup__subheader">
              Что-то пошло не так! Попробуйте ещё раз.
            </h2>
          </>
        ) : (
          <>
            <div className="popup__sign_type_success"></div>
            <h2 className="popup__subheader">Вы успешно зарегистрировались!</h2>
          </>
        )}
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
