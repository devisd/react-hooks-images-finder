import './ImageGalleryItem.css';

const ImageGalleryItem = ({ image, largeImageURL, tags, onModal }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        onClick={() => onModal(largeImageURL)}
        src={image}
        alt={tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
