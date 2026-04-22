import { useSelector } from "react-redux";
import { Navbar } from "../components";
import { NoteView, JournalView } from "../view";
import { RootState } from "../../store";

interface JournalInterface {
  children?: JSX.Element[] | JSX.Element;
}

export const JournalLayout = ({ children }: JournalInterface) => {
  const { active } = useSelector((state: RootState) => state.journal);

  return (
    <div className="min-h-dvh flex flex-col bg-background text-on-surface">
      <Navbar />
      <main className="flex-1">{active ? <NoteView /> : <JournalView />}</main>
      {children}
    </div>
  );
};
