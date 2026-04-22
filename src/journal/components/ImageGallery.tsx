
interface ImageGalleryProps {
  imagesArray: string[]
}

export const ImageGallery = ({ imagesArray = [] }: ImageGalleryProps) => {

  if (imagesArray.length === 0) return null;

  return (
    <div className="grid gap-3 overflow-y-auto max-h-[calc(50vh-4rem)] [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))]">
      {imagesArray.map((image) => (
        <div
          key={image}
          className="h-40 overflow-hidden rounded-md"
        >
          <img
            src={image}
            alt={image}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}
