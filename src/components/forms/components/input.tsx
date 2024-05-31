import clsx from "clsx";
import { useState } from "react";

const Input = ({
  value,
  type,
  disabled = false,
  label,
  formOptions,
  error,
  className = ''
}: {
  value?: string;
  type: string;
  disabled?: boolean;
  label: string;
  formOptions: {};
  error?: string;
  className?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={clsx("relative w-full font-castForm", className)}>
      <input
        type={type}
        value={value}
        disabled={disabled}
        className="font-base block mb-1 w-full p-2 text-base text-castTitle bg-castFormBg border rounded-xl border-castPrimary appearance-none focus:outline-none focus:ring-2 focus:ring-castPrimary focus:border-transparent"
        {...formOptions}
        onFocus={() => setIsFocused(true)}
        placeholder={!isFocused ? label : ''}
      />
      <span className="">
      <p className="ml-2 mb-6 text-sm text-left text-red-600">{error ? error : ''}</p>
      </span>
      <label
        className={clsx(
          "absolute font-medium top-3 left-2 px-1 text-sm transition-transform duration-300 ease-in-out transform origin-left scale-70 -translate-y-5 text-castPrimary bg-castFormBg",
          {
            "hidden": !isFocused
          }
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
