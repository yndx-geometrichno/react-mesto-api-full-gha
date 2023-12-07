import { useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../contexts/AppContext";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "./Input";
import { cardName_validation, url_validation } from "../utils/inputValidations";

export default function AddPlacePopup({ isOpen, onSubmitCard }) {
  const appContext = useContext(AppContext);

  const methods = useForm({ mode: "onChange" });

  const formState = methods.formState;

  const onSubmit = methods.handleSubmit((data) => {
    onSubmitCard({
      name: data.cardName,
      link: data.url,
    });
  });

  useEffect(() => {
    methods.reset({cardName: "", url: ""})
  }, [isOpen, methods])
  
  return (
    <FormProvider {...methods}>
      <PopupWithForm
        name="card"
        title="Новое место"
        isOpen={isOpen}
        onSubmit={onSubmit}
        buttonText={appContext.isSubmitLoading ? "Сохранение..." : "Сохранить"}
        isValid={formState.isValid}
      >
        <Input {...cardName_validation} />
        <Input {...url_validation} />
      </PopupWithForm>
    </FormProvider>
  );
}
