import { IoSaveSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { AppDispatch, RootState } from "../../store";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "../../hooks";
import { setActiveNote, startDeletingNoteById, startSavingNote, startUploadingFiles } from "../../store/journal";
import { FaUpload } from "react-icons/fa";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import { ImageGallery } from "../components";

export const NoteView = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { active: note, isSaving, messageSaved, errorMessage } = useSelector((state: RootState) => state.journal);
  const { title, body, date, onInputChange, formState } = useForm(note);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const dateString = useMemo(() => {
    return new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }, [date]);

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Note saved', messageSaved, 'success');
    }
  }, [messageSaved]);

  useEffect(() => {
    if (errorMessage.length > 0) {
      Swal.fire('Error', errorMessage, 'error');
    }
  }, [errorMessage]);

  const onHandleSaveNote = () => {
    if (title.length <= 1) return;
    dispatch(startSavingNote());
  }

  const onDeleteNote = () => {
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
      }
    });
  }

  const onFileInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files?.length) return;
    dispatch(startUploadingFiles(target.files));
  }

  const onBack = () => {
    dispatch(setActiveNote(null));
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-24">

      {/* Top toolbar */}
      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full transition-all active:scale-95 hover:opacity-75 text-on-surface-variant"
            onClick={onBack}
            aria-label="Back"
          >
            <FiArrowLeft size={20} />
          </button>
          <span className="font-body text-sm font-medium text-on-surface-variant">
            {dateString}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="file"
            multiple
            accept="image/png, image/gif, image/jpeg"
            className="hidden"
            ref={fileInputRef}
            onChange={onFileInputChange}
          />
          <button
            className="btn-secondary flex items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSaving}
          >
            <FaUpload size={14} />
            <span>Add Images</span>
          </button>
          <button
            className="btn-primary flex items-center gap-2"
            onClick={onHandleSaveNote}
            disabled={isSaving}
          >
            <IoSaveSharp size={15} />
            <span>{isSaving ? 'Saving…' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="mb-5">
        <input
          type="text"
          className="input-sanctuary w-full font-display font-bold text-headline-lg"
          placeholder="Enter a title…"
          name="title"
          value={title}
          onChange={onInputChange}
        />
      </div>

      {/* Body */}
      <div className="mb-8">
        <textarea
          className="input-sanctuary w-full resize-none font-body text-body-md leading-[1.75]"
          rows={14}
          placeholder="What happened today?"
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </div>

      {/* Images */}
      <ImageGallery imagesArray={note!.imageUrls} />

      {/* Delete (only shown for already-saved notes) */}
      {note?.id && (
        <div className="flex justify-end mt-8">
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body font-semibold text-label-md bg-error-container text-error transition-all active:scale-95 hover:opacity-80 cursor-pointer border-none"
            onClick={onDeleteNote}
          >
            <FiTrash2 size={15} />
            Delete Note
          </button>
        </div>
      )}

    </div>
  )
}
