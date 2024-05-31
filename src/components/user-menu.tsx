import clsx from "clsx";
import { Link } from "react-router-dom";
import { useAuthActions } from "../services/hooks";

const UserMenu = ({ isVisible }: { isVisible: boolean }) => {
    const { logout } = useAuthActions();
  return (
    <div
      className={clsx(
        "bg-castNavbar w-38 px-4 absolute top-12 right-10 border-t-4 border-castPrimary transition-transform duration-300 ease-out",
        isVisible
          ? "transform scale-y-100 origin-top"
          : "transform scale-y-0 origin-top"
      )}
    >
      <ul className="text-right text-castTitleDisabled text-s">
        <li>
          <Link className="my-1 mx-2 rowdies-light underline-hover" to={"/"}>
            Perfil
          </Link>
        </li>
        <li>
          <Link onClick={logout} className="my-1 mx-2 rowdies-light underline-hover" to={"/"}>
            Cerrar Sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
