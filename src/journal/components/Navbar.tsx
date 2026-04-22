import { IoMdExit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { startLogoutFirebase } from "../../store/auth";

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { displayName } = useSelector((state: RootState) => state.auth);

  const onLogout = () => {
    dispatch(startLogoutFirebase());
  };

  return (
    <header className="sticky top-0 z-40 w-full glass shadow-ambient rounded-b-2xl">
      <div className="flex justify-between items-center px-8 py-5 w-full max-w-7xl mx-auto">
        <span className="font-display font-extrabold text-primary text-2xl tracking-[-0.04em]">
          Journal App
        </span>

        <div className="flex items-center gap-5">
          {displayName && (
            <span className="hidden md:block font-display font-medium text-[1.0625rem] text-on-surface tracking-[-0.01em]">
              Hello, {displayName}
            </span>
          )}
          <button
            className="p-2 rounded-full transition-all active:scale-95 hover:opacity-75 text-on-surface-variant"
            onClick={onLogout}
            aria-label="Logout"
          >
            <IoMdExit size={22} />
          </button>
        </div>
      </div>
    </header>
  );
};
