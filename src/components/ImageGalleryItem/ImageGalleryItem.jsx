import { Component } from 'react';
import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { smallImg, largeImg, tags } = this.props;
    return (
      <>
        <Image src={smallImg} alt={tags} onClick={this.toggleModal} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImg} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = PropTypes.shape({
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
}).isRequired;

export default ImageGalleryItem;
