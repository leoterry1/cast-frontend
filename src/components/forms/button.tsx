import clsx from "clsx";

const Button = ({
  label,
  onClick,
  disabled = false,
  color,
  bgColor,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  color: string;
  bgColor: string;
}) => {
  return (
    <span
      onClick={!disabled ? onClick : undefined}
      className={clsx("w-28 px-3 py-2 h-9 cursor-pointer text-bold rounded-md", `bg-${bgColor}`, `text-${color}`)}
    >
      {label}
    </span>
  );
};

export default Button;
