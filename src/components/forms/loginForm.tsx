import Button from "./button";
import Input from "./components/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthActions } from "../../services/hooks";
import { LoginParams } from "../../services/auth";

const schema = yup
  .object({
    email: yup
      .string()
      .required("El email es  requerido")
      .email("Debe ser un email válido"),
    password: yup.string().required("La contraseña es requerida"),
  })
  .required();

const LoginForm = () => {
  const { login } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: LoginParams) => await login(data);
  return (
    <div className="py-10 bg-castFormBg flex justify-center items-center">
      <form className="w-4/5 items-center">
        <Input
          error={errors.email?.message}
          formOptions={register("email")}
          label="Correo Electrónico"
          type="text"
        />
        <Input
          error={errors.password?.message}
          formOptions={register("password")}
          label="Contraseña"
          type="password"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          label="INGRESAR"
          color="castTitleDisabled"
          bgColor="castPrimary"
        />
      </form>
    </div>
  );
};

export default LoginForm;
