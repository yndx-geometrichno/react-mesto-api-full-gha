import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { Link } from "react-router-dom";

export default function Header({ onSignOut }) {
  const appContext = useContext(AppContext);
  const currentPath = window.location.pathname;
  const [isMobileWidth, setMobileWidth] = useState(false);
  const [isUserInfoOpened, setUserInfoOpened] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  useEffect(() => {
    if (screenWidth <= 500) {
      setMobileWidth(true);
    } else {
      setMobileWidth(false);
      setUserInfoOpened(false);
    }
  }, [screenWidth]);

  function handleMenuBtnClick() {
    if (isUserInfoOpened) {
      setUserInfoOpened(false);
    } else setUserInfoOpened(true);
  }

  return (
    <header className={`header ${isUserInfoOpened && "header_type_moved"}`}>
      {appContext.isLoggedIn && isMobileWidth && (
        <div
          className={`header__user-container_type_mobile ${
            isUserInfoOpened && "header__user-container_type_mobile_active"
          }`}
        >
          <div className="header__user-email">{appContext.userEmail}</div>
          <button className="header__button header__button_type_slide-menu" onClick={onSignOut}>
            Выйти
          </button>
        </div>
      )}
      <div className="header__logo"></div>
      {appContext.isLoggedIn ? (
        <>
          {!isMobileWidth && (
            <div className="header__user-container">
              <div className="header__user-email">{appContext.userEmail}</div>
              <button className="header__button" onClick={onSignOut}>
                Выйти
              </button>
            </div>
          )}
          <div
            className={`header__menu-btn header__menu-btn_type_${
              !isUserInfoOpened ? "open" : "close"
            }`}
            onClick={handleMenuBtnClick}
          ></div>
        </>
      ) : currentPath === "/signin" ? (
        <Link to="signup" className="header__button">
          Регистрация
        </Link>
      ) : (
        <Link to="signin" className="header__button">
          Войти
        </Link>
      )}
    </header>
  );
}
