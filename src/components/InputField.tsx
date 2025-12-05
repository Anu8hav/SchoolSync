import { FieldError } from "react-hook-form";
import clsx from "clsx";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  inputClassName?: string;
  wrapperClassName?: string;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  inputClassName,
  wrapperClassName,
}: InputFieldProps) => {
  return (
    <div className={clsx("flex flex-col gap-2 w-full", wrapperClassName)}>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        defaultValue={defaultValue}
        {...inputProps}
        className={clsx(
          "ring-[1.5px] ring-gray-300 p-3 rounded-md text-base w-full", // better size
          inputClassName
        )}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
