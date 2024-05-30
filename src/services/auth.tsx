import { PropsWithChildren, createContext } from "react";
import { User } from "../models/user";
import { notifyError } from "./hooks";
import { useApiService } from "../components/cast-api-context";

export interface AuthState {
  token?: string;
  user?: User;
  authenticated?: boolean;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface AuthActions {
  logout(): void;
  login(data: LoginParams): Promise<void>;
}

export const AuthContext = createContext<AuthState & AuthActions>(
  {} as AuthActions & AuthState
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const api = useApiService();

  function logout() {
    localStorage.removeItem('user')
  }

  async function login(data: LoginParams) {
    const response = await api.call('login', { data });
    if(response.status !== 200){
      return notifyError(response);
    }
    localStorage.setItem('user', JSON.stringify(response.data));
    window.location.reload();
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
