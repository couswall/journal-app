import { Link } from "react-router-dom";
import { FaGoogle, FaEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  startGoogleSignIn,
  startSignInWithEmailPassword,
} from "../../../store/auth";
import { AppDispatch, RootState } from "../../../store";
import {
  AuthBackground,
  LoginBrand,
  FormInput,
  PasswordInput,
} from "../../components";
import { loginSchema } from "../../schemas";

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth,
  );
  const isLoading = status === "checking";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmitForm = ({ email, password }: LoginFormValues) => {
    if (isLoading) return;
    dispatch(startSignInWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    if (isLoading) return;
    dispatch(startGoogleSignIn());
  };

  return (
    <div className="relative flex min-h-[max(884px,100dvh)] flex-col items-center overflow-hidden bg-background font-body text-on-surface">
      <AuthBackground />

      <main className="relative z-10 flex w-full max-w-120 flex-1 flex-col justify-center px-6 py-20">
        <LoginBrand />

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="mb-8 flex flex-col gap-6">
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              register={register}
              placeholder="name@example.com"
              icon={<FaEnvelope size={16} />}
              error={errors.email ? String(errors.email.message) : undefined}
            />

            <PasswordInput
              name="password"
              register={register}
              error={errors.password ? String(errors.password.message) : undefined}
            />

            <label className="flex cursor-pointer items-center gap-3 px-2">
              <input
                type="checkbox"
                className="h-5 w-5 shrink-0 cursor-pointer accent-primary"
              />
              <span className="text-label-md font-medium text-on-surface-variant">
                Keep me signed in
              </span>
            </label>
          </div>

          {errorMessage && (
            <p className="mb-4 rounded-xl bg-error/10 px-4 py-3 text-center text-sm font-medium text-error">
              {errorMessage instanceof Error
                ? errorMessage.message
                : String(errorMessage)}
            </p>
          )}

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-16 w-full cursor-pointer items-center justify-center gap-3 rounded-full border-none bg-primary text-lg font-bold text-on-primary shadow-ambient transition-all hover:scale-[1.02] hover:bg-[#40584a] active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="flex items-center py-4">
              <div className="h-px flex-1 bg-outline-variant/15" />
              <span className="mx-4 text-label-sm font-bold uppercase tracking-widest text-outline-variant">
                or
              </span>
              <div className="h-px flex-1 bg-outline-variant/15" />
            </div>

            <button
              type="button"
              onClick={onGoogleSignIn}
              disabled={isLoading}
              className="flex h-16 w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-outline-variant/10 bg-surface-container-lowest text-base font-semibold text-on-surface transition-all hover:bg-surface-container-low active:scale-[0.95] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              <FaGoogle size={20} /> Continue with Google
            </button>
          </div>
        </form>

        <footer className="mt-16 text-center">
          <p className="m-0 text-body-sm font-medium text-on-surface-variant">
            Don't have an account?{" "}
            <Link
              to="/auth/register"
              className="ml-1 font-bold text-primary no-underline"
            >
              Create an account
            </Link>
          </p>
        </footer>
      </main>
    </div>
  );
};
