import logo from "../assets/logo-clean.png";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import clsx from "clsx";
import { useCurrentUser } from "../services/hooks";
import UserMenu from "./user-menu";
import { useState } from "react";

const SECTIONS = [
  {
    name: "INICIO",
    to: "/",
  },
  {
    name: "HORARIOS",
    to: "/horarios",
  },
  {
    name: "POSICIONES",
    to: "/posiciones",
  },
  {
    name: "CONTACTO",
    to: "/contacto",
  },
];

export const Layout = () => {
  const currentUser = useCurrentUser();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => setIsMenuVisible(!isMenuVisible);
  
  return (
    <div className="w-full font-castFont h-14 bg-castNavbar sticky flex items-center">
      <img width={120} src={logo} className="m-8" />
      <ul className="flex items-center ml-6">
        {SECTIONS.map((section, key) => {
          const className =
            window.location.pathname === section.to
              ? "text-castPrimary"
              : "text-castTitleDisabled";

          return (
            <Link
              key={key}
              className={clsx(
                "text-xl m-4 rowdies-light underline-hover",
                className
              )}
              to={"/"}
            >
              {section.name}
            </Link>
          );
        })}
      </ul>
      <span onClick={toggleMenu} className="text-castTitleDisabled text-base ml-auto mr-8 flex items-center cursor-pointer">
        <p className="underline-hover">{currentUser?.name?.toUpperCase()}</p>
        {isMenuVisible ? <KeyboardArrowUpIcon fontSize="large"/> : <KeyboardArrowDownIcon fontSize="large"/>}
      </span>
      <UserMenu isVisible={isMenuVisible}/>
    </div>
  );
};

export default Layout;
