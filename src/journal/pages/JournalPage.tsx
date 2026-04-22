import { FiPlus } from "react-icons/fi"
import { JournalLayout } from "../layout/JournalLayout"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { startNewNote } from "../../store/journal"


export const JournalPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { isSaving } = useSelector((state: RootState) => state.journal);

  const onCreateNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <JournalLayout>
      <button
        className="fixed bottom-12 right-8 z-50 w-16 h-16 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-[0_12px_40px_rgba(76,100,86,0.35)] hover:scale-110 active:scale-90 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onCreateNewNote}
        disabled={isSaving}
        aria-label="New note"
      >
        <FiPlus
          size={24}
          className="transition-transform duration-300 group-hover:rotate-90"
        />
      </button>
    </JournalLayout>
  )
}
