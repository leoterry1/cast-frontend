import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../services/hooks";

export const HomePage = () => {
    const { logout } = useAuthActions();
    const navigate = useNavigate();

    const onLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <div>
            <h1>HOME</h1>
            <button className="bg-castPrimary text-castTitleDisabled" onClick={onLogout}>LOGOUT</button>
        </div>
    )
};
