import PropTypes from 'prop-types';
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

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};
