import { useForm } from "react-hook-form";
import Button from "../../button";
import Input from "../../components/input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FirstStepData } from "..";

const schema = yup
  .object({
    email: yup
      .string()
      .required("El email es  requerido")
      .email("Debe ser un email válido"),
    rid: yup.string().required("Este campo es requerido"),
  })
  .required();

const FirstStep = ({
  onSubmit
}: {
  onSubmit: (data: FirstStepData) => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form className="w-4/5 items-center">
      <Input
        error={errors.email?.message}
        formOptions={register("email")}
        label="Correo electrónico"
        type="text"
      />
      <Input
        error={errors.rid?.message}
        formOptions={register("rid")}
        label="Riot ID"
        type="text"
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        label="SIGUIENTE"
        color="castTitleDisabled"
        bgColor="castPrimary"
      />
    </form>
  );
};

export default FirstStep;
