import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";
import { avatar_validation } from "../utils/inputValidations";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const appContext = useContext(AppContext);

  const methods = useForm({ mode: "all" });

  const formState = methods.formState;

  const onSubmit = methods.handleSubmit((data) => {
    onUpdateAvatar(data);
  });

  useEffect(() => {
    methods.reset({ avatar: "" });
  }, [isOpen, methods]);

  return (
    <FormProvider {...methods}>
      <PopupWithForm
        name="profile-pic-update"
        title="Обновить аватар"
        isOpen={isOpen}
        buttonText={appContext.isSubmitLoading ? "Сохранение..." : "Сохранить"}
        isValid={formState.isValid}
        onSubmit={onSubmit}
      >
        <Input {...avatar_validation} />
      </PopupWithForm>
    </FormProvider>
  );
}
