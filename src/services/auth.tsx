import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { User } from "../models/user";
import { API_KEY, API_SECRET } from "../../environment";
import { jwtDecode } from "jwt-decode";
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

const verifyToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken && decodedToken.exp) {
      const expirationDate = decodedToken.exp * 1000;
      const currentDate = new Date();
      const differenceInMilliseconds = expirationDate - currentDate.getTime();

      const pastDays = differenceInMilliseconds / (1000 * 3600 * 24);

      if (pastDays < 0) {
        localStorage.removeItem("token");
        return false;
      }
      return true;
    }
  }
  return false;
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState<AuthState>({});
  const api = useApiService();
  async function authenticateRequest() {
    const response = await api.call('authenticate', {
      data: { apiKey: API_KEY, apiSecret: API_SECRET },
    });
    if (response.status !== 200) return setState({ authenticated: false });
    localStorage.setItem("token", response.data.token);
    setState({ token: response.data.token });
  }
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

  useEffect(() => {
    const verify = verifyToken();
    if (!verify) authenticateRequest();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ login, logout, ...state }}>
      {children}
    </AuthContext.Provider>
  );
};
