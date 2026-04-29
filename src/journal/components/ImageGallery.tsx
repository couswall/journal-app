import { FiX } from "react-icons/fi";

interface ImageItem {
  url: string;
  onDelete: () => void;
}

interface ImageGalleryProps {
  images: ImageItem[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-3 overflow-y-auto max-h-[calc(50vh-4rem)] [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))]">
      {images.map(({ url, onDelete }) => (
        <div key={url} className="relative h-40 overflow-hidden rounded-md group">
          <img
            src={url}
            alt={url}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <button
            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-none"
            onClick={onDelete}
            aria-label="Delete image"
            type="button"
          >
            <FiX size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
