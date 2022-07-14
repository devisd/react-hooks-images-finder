import ImageGalleryItem from '../ImageGalleryItem';
import './ImageGallery.css';

const ImageGallery = ({ hits, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {hits.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          onModal={onImageClick}
          key={id}
          image={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
