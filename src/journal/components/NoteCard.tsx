import { useMemo } from "react";
import { NoteState, setActiveNote, startDeletingNoteById } from "../../store/journal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const NoteCard = ({ title = '', body, id, imageUrls = [], date }: NoteState) => {

  const dispatch = useDispatch<AppDispatch>();

  const dateString = useMemo(() => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
  }, [date]);

  const onHandleActiveNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
  }

  const onDeleteNote = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setActiveNote({ id, title, body, date, imageUrls }));
    Swal.fire({
      title: '¿Deseas eliminar la nota?',
      text: 'Esta acción no podrá revertirse',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--color-primary)',
      cancelButtonColor: 'var(--color-error)',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeletingNoteById());
      } else {
        dispatch(setActiveNote(null));
      }
    });
  }

  return (
    <article
      className="group relative flex flex-col overflow-hidden cursor-pointer bg-surface-container-lowest rounded-xl shadow-ambient hover:shadow-float transition-shadow duration-300"
      onClick={onHandleActiveNote}
    >

      {imageUrls.length > 0 ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrls[0]}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-[0.05em] backdrop-blur-md bg-surface/90 text-primary font-body">
              {dateString}
            </span>
          </div>
        </div>
      ) : (
        <div className="px-7 pt-6 pb-0">
          <span className="text-xs font-bold tracking-widest uppercase text-outline font-body">
            {dateString}
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col flex-grow gap-3">
        <h4 className="font-display font-bold text-on-surface text-headline-sm line-clamp-2 leading-snug">
          {title || 'Untitled'}
        </h4>
        <p className="font-body text-body-sm text-on-surface-variant leading-relaxed line-clamp-3 flex-grow">
          {body}
        </p>
        <div className="mt-2 flex justify-end items-center gap-1">
          <button
            className="p-2 rounded-full transition-all active:scale-90 text-outline hover:text-primary"
            onClick={(e) => { e.stopPropagation(); onHandleActiveNote(); }}
            aria-label="Edit note"
          >
            <FiEdit2 size={17} />
          </button>
          <button
            className="p-2 rounded-full transition-all active:scale-90 text-outline hover:text-error"
            onClick={onDeleteNote}
            aria-label="Delete note"
          >
            <FiTrash2 size={17} />
          </button>
        </div>
      </div>

    </article>
  )
}
