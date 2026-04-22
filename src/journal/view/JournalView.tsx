import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { startNewNote } from '../../store/journal';
import { NoteCard } from '../components';
import { FiBookOpen, FiPlus } from 'react-icons/fi';

export const JournalView = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { notes, isSaving } = useSelector((state: RootState) => state.journal);

  const onCreateNewNote = () => {
    dispatch(startNewNote());
  }

  if (notes.length === 0) {
    return (
      <main className="pt-24 pb-32 px-6 min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-xl flex flex-col items-center text-center">

          {/* Illustration */}
          <div className="relative w-72 h-72 mb-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-3xl" />
            <div className="relative z-10 w-full h-full bg-surface-container-lowest rounded-xl shadow-[0_20px_50px_rgba(76,100,86,0.05)] p-8 flex flex-col items-center justify-center">
              <FiBookOpen className="text-primary opacity-30 w-24 h-24" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-tertiary-container/30 rounded-full blur-2xl" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-display text-4xl font-extrabold text-primary tracking-tight mb-4">
            No experiences yet
          </h2>

          {/* Description */}
          <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-md mb-10">
            Start capturing your memories by creating your first experience. Add moments, photos, and thoughts to build your personal journal.
          </p>

          {/* CTA */}
          <button
            className="bg-primary text-on-primary font-display font-semibold px-8 py-4 rounded-full shadow-[0_8px_30px_rgba(76,100,86,0.15)] hover:bg-primary-dim transition-all active:scale-95 flex items-center gap-2 group disabled:opacity-50"
            onClick={onCreateNewNote}
            disabled={isSaving}
          >
            <FiPlus className="text-xl transition-transform duration-300 group-hover:rotate-90" />
            Create your first experience
          </button>

        </div>
      </main>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-12 pb-32">

      {/* Daily Reflection Hero */}
      <section className="mb-16">
        <div className="reflection-block">
          <span className="text-label-sm tracking-widest uppercase block mb-4 opacity-60">
            Daily Reflection
          </span>
          <h2 className="text-display-sm max-w-xl mb-8">
            What is one small thing that brought you peace today?
          </h2>
          <button
            className="btn-primary"
            onClick={onCreateNewNote}
            disabled={isSaving}
          >
            Start Writing
          </button>
        </div>
      </section>

      {/* Section header */}
      <div className="flex items-end justify-between mb-10 px-1">
        <div>
          <span className="text-label-sm block mb-1 text-on-surface-variant">
            Personal Archives
          </span>
          <h3 className="text-display-sm text-on-surface">
            Your Experiences
          </h3>
        </div>
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} {...note} />
        ))}
      </div>

    </div>
  )
}
