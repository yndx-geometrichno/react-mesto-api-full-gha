import { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";

export default function DeleteCardPopup({ isOpen, onCardDelete }) {
  const appContext = useContext(AppContext);

  function handleSubmit() {
    onCardDelete();
  }

  return (
    <PopupWithForm
      name="delete-card-confirmation"
      title="Вы уверены?"
      buttonText={appContext.isSubmitLoading ? "Удаление..." : "Да"}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      isValid={true}
    />
  );
}
