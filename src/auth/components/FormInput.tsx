import { FieldValues, UseFormRegister, RegisterOptions, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  placeholder?: string;
  icon: React.ReactNode;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T, Path<T>>;
  error?: string;
}

export const FormInput = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  placeholder,
  icon,
  validation,
  error,
}: FormInputProps<T>) => (
  <div>
    <label className="text-label-md mb-2 ml-2 block font-semibold text-on-surface-variant">
      {label}
    </label>
    <div className="relative">
      <span className="pointer-events-none absolute left-5 top-1/2 flex -translate-y-1/2 text-outline-variant">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className="h-16 w-full rounded-full border-none bg-surface-container-low pl-14 pr-6 text-base text-on-surface outline-none transition-all placeholder:text-on-surface-variant/60 focus:bg-surface-container-highest focus:ring-2 focus:ring-primary/20"
      />
    </div>
    {error && (
      <p className="mt-2 ml-2 text-sm font-medium text-error">{error}</p>
    )}
  </div>
);
