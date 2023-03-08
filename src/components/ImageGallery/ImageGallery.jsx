import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Item, List } from './ImageGallery.styled';

const ImageGallery = ({ images }) => {
  return (
    <List>
      {images.map(image => (
        <Item key={image.id}>
          <ImageGalleryItem
            smallImg={image.webformatURL}
            largeImg={image.largeImageURL}
            tags={image.tags}
          />
        </Item>
      ))}
    </List>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
