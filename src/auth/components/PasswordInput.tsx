import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldValues, UseFormRegister, RegisterOptions, Path } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  showForgot?: boolean;
  validation?: RegisterOptions<T, Path<T>>;
  error?: string;
}

export const PasswordInput = <T extends FieldValues>({
  name,
  register,
  showForgot = true,
  validation,
  error,
}: PasswordInputProps<T>) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between px-2">
        <label className="text-label-md font-semibold text-on-surface-variant">
          Password
        </label>
        {showForgot && (
          <a
            href="#"
            className="text-label-sm font-bold text-primary no-underline opacity-100 transition-opacity hover:opacity-70"
          >
            Forgot?
          </a>
        )}
      </div>
      <div className="relative">
        <span className="pointer-events-none absolute left-5 top-1/2 flex -translate-y-1/2 text-outline-variant">
          <FaLock size={16} />
        </span>
        <input
          type={show ? "text" : "password"}
          {...register(name, validation)}
          placeholder="••••••••"
          className="h-16 w-full rounded-full border-none bg-surface-container-low pl-14 pr-14 text-base text-on-surface outline-none transition-all placeholder:text-on-surface-variant/60 focus:bg-surface-container-highest focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-5 top-1/2 flex -translate-y-1/2 cursor-pointer items-center border-none bg-transparent p-0 text-outline transition-opacity hover:opacity-70"
        >
          {show ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>
      {error && (
        <p className="mt-2 ml-2 text-sm font-medium text-error">{error}</p>
      )}
    </div>
  );
};
