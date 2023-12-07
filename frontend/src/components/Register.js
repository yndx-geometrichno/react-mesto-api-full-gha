import { useState } from "react";
import { Link } from "react-router-dom";
import SignForm from "./SignForm";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(password, email);
  }

  return (
    <SignForm
      header={"Регистрация"}
      buttonText={"Зарегистрироваться"}
      email={email}
      password={password}
      onSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
    >
      <p className="sign__link-container">
        Уже зарегистрированы?
        <Link to="/signin" className="sign__link">
          Войти
        </Link>
      </p>
    </SignForm>
  );
}
