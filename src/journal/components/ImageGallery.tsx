
import './styles'

interface ImageGalleryProps{
    imagesArray: string[]
}

export const ImageGallery = ( {imagesArray = []}: ImageGalleryProps ) => {
  return (
    <div className="container-fluid mb-2" >
        <div className="gallery-wrapper row">
            {
                imagesArray.map( image => (
                    <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2 image-gallery" key={ image }>
                        <img src={image} 
                            alt={ image } 
                            className="img-thumbnail" 
                            loading="lazy"
                        />
                    </div>
                ))
            }
        </div>
    </div>
  )
}
