import { useState } from "react";
import SignForm from "./SignForm";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(password, email);
  }

  return (
    <SignForm
      header="Вход"
      email={email}
      password={password}
      onSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      buttonText="Войти"
    />
  );
}
