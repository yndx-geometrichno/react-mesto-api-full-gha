import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import usePopupClose from "../hooks/usePopupClose";

export default function ImagePopup({ card }) {
  const appContext = useContext(AppContext);
  usePopupClose(card?.link, appContext.onClose);

  return (
    <div
      className={`popup popup_type_photo ${card.link ? "popup_opened" : ""}`}
    >
      <div className="photo-popup">
        <img className="photo-popup__photo" src={card.link} alt={card.name} />
        <h2 className="photo-popup__header">{card.name}</h2>
        <button
          aria-label="Закрыть"
          type="button"
          className="photo-popup__close-btn popup__close-btn"
          onClick={appContext.onClose}
        ></button>
      </div>
    </div>
  );
}
