import { useState } from "react";
import logo from "../assets/login/LoginLogo.svg";
import background from "../assets/login/loginBackground.jpg";
import { PageContainer } from "../components/ui/page-container";
import clsx from "clsx";
import LoginForm from "../components/forms/loginForm";
import RegisterForm from "../components/forms/registerForm";

export const Login = () => {
  const [selected, setSelected] = useState<string>("login");

  return (
    <PageContainer>
      <div className="flex h-full">
        <div className="w-2/3 flex justify-center content-center items-center">
          <div className="w-1/3 h-full">
            <div className="flex  m-5 justify-center items-center">
              <img src={logo} />
            </div>
            <div className="rounded-xl text-center overflow-hidden">
              <div className="flex">
                <span
                  onClick={() => setSelected("login")}
                  className={clsx(
                    "w-1/2 p-2 cursor-pointer transition-colors duration-500 ease-in-out",
                    selected === "login" ? "bg-castPrimary" : "bg-castFormBg"
                  )}
                >
                  <h1
                    className={clsx(
                      "font-bold",
                      selected === "login" ? "text-castTitleDisabled" : "text-text-castTitle"
                    )}
                  >
                    INICIAR SESIÓN
                  </h1>
                </span>
                <span
                  onClick={() => setSelected("register")}
                  className={clsx(
                    "w-1/2 p-2 cursor-pointer transition-colors duration-500 ease-in-out",
                    selected === "register"
                      ? "bg-castPrimary"
                      : "bg-castFormBg"
                  )}
                >
                  <h1
                    className={clsx(
                      "font-bold",
                      selected === "register"
                        ? "text-castTitleDisabled"
                        : "text-castTitle"
                    )}
                  >
                    REGISTRO
                  </h1>
                </span>
              </div>
              {selected === 'login' ? <LoginForm/> : <RegisterForm/>}
            </div>
          </div>
        </div>
        <div
          className="bg-cover bg-center h-full w-1/3"
          style={{ backgroundImage: `url(${background})` }}
        />
      </div>
    </PageContainer>
  );
};
