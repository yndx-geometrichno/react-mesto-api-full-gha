import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({
  card,
  name,
  link,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `card__like-btn ${
    isLiked && "card__like-btn_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      {isOwn && (
        <button
          type="button"
          className="card__delete-btn"
          onClick={handleDeleteCard}
        />
      )}
      <img className="card__img" src={link} alt={name} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__name">{name}</h2>
        <div className="card__like-container">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <div className="card__like-counter">{card.likes.length}</div>
        </div>
      </div>
    </article>
  );
}
