import { useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";
import {
  about_validation,
  profileName_validation,
} from "../utils/inputValidations";

export default function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const appContext = useContext(AppContext);

  const methods = useForm({ mode: "onTouched" });

  const formState = methods.formState;

  const onSubmit = methods.handleSubmit((data) => {
    onUpdateUser({
      name: data.profileName.trim(),
      about: data.about.trim(),
    });
    methods.reset({ profileName: "", about: ""})
  });

  useEffect(() => {
    methods.setValue(profileName_validation.name, currentUser.name);
    methods.setValue(about_validation.name, currentUser.about);
  }, [isOpen, currentUser, methods]);

  return (
    <FormProvider {...methods}>
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isOpen}
        onSubmit={onSubmit}
        buttonText={appContext.isSubmitLoading ? "Сохранение..." : "Сохранить"}
        isValid={formState.isValid}
      >
        <Input {...profileName_validation} />
        <Input {...about_validation} />
      </PopupWithForm>
    </FormProvider>
  );
}
