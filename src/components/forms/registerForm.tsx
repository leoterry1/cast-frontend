import Button from "./button";
import Input from "./components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { notifyError, setCurrentUser } from "../../services/hooks";
import { useNavigate } from "react-router-dom";
import FirstStep from "./registerForm/components/firstStep";
import { useApiService } from "../cast-api-context";

interface FirstStep {
  email: string;
  rid: string;
}

interface LastStep {
  name: string;
  surname: string;
  password: string;
  passwordConfirmation: string;
}

const schema = yup
  .object({
    password: yup
      .string()
      .required("La contraseña es requerida")
      .min(8, "Debe contener al menos 8 caracteres"),
    passwordConfirmation: yup
      .string()
      .required("Este campo es requerido")
      .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
    surname: yup.string().required("Este campo es requerido"),
    name: yup.string().required("Este campo es requerido"),
  })
  .required();

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [step, setStep] = useState(1);
  const [initialData, setInitialData] = useState<FirstStep | {}>({});
  const navigate = useNavigate();
  const api = useApiService();

  const onNextStep = async (data: FirstStep) => {
    const response = await api.call("verifyExistence", { data });
    if (response.status === 200) {
      setInitialData(data);
      return setStep(2);
    }
    notifyError(response);
  };

  const onSubmit = async (data: LastStep) => {
    const response = await api.call("createUser", {
      data: { ...initialData, ...data },
    });
    if (response.status === 201) {
      setCurrentUser(response.data);
      return navigate("/", { replace: true });
    }
    notifyError(response);
  };

  return (
    <div className="py-10 bg-castFormBg flex justify-center items-center">
      {step === 1 && <FirstStep onSubmit={onNextStep} />}
      {step === 2 && (
        <form className="w-4/5 items-center">
          <Input
            error={errors.name?.message}
            formOptions={register("name")}
            label="Nombre"
            type="text"
          />
          <Input
            error={errors.surname?.message}
            formOptions={register("surname")}
            label="Apellido"
            type="text"
          />
          <Input
            error={errors.password?.message}
            formOptions={register("password")}
            label="Contraseña"
            type="password"
          />
          <Input
            error={errors.passwordConfirmation?.message}
            formOptions={register("passwordConfirmation")}
            label="Confirmar contraseña"
            type="password"
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            label="REGISTRARME"
            color="castTitleDisabled"
            bgColor="castPrimary"
          />
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
