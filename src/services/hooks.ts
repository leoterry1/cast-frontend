import { useContext } from "react";
import toast from 'react-hot-toast';
import { AuthActions, AuthContext } from "./auth";
import { User } from "../models/user";
import { AxiosResponse } from "axios";

export function useCurrentUser(): User | undefined {
    const user = localStorage.getItem('user');
    if(!user) return; 
    return JSON.parse(user);
}

export function setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
}

export function useCurrentToken(): string | undefined {
    const { token } = useContext(AuthContext);
    return token;
}

export function useAuthActions(): AuthActions {
    return useContext(AuthContext);
}

export function notifyError(response: AxiosResponse): void {
    toast.error(response.data.error);
}
