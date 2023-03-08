import { getImages } from 'api/images-api';
import { Component } from 'react';
import ErrorView from 'components/ErrorView';
import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

class ImageInfo extends Component {
  state = {
    images: [],
    searchWord: '',
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const searchWord = this.props.value.trim();

    if (searchWord === '') {
      toast.error('Please, enter your search request');
      return;
    }

    if (prevProps.value !== searchWord)
      return this.setState({
        images: [],
        page: 1,
        status: 'pending',
        searchWord,
      });

    if (
      prevState.searchWord !== this.state.searchWord ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      getImages(searchWord, this.state.page)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(new Error('Sorry, no images were found'));
        })
        .then(images => {
          if (images.hits.length === 0) {
            this.setState({ status: 'rejected' });
            return;
          }

          this.setState({
            images: [...this.state.images, ...images.hits],
            status: 'resolved',
          });
          console.log(images);
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  handleLoad = () => {
    this.setState(prev => ({ page: prev.page + 1, status: 'pending' }));
  };

  render() {
    const { status, images } = this.state;

    // if (status === 'idle') return <div>Please, enter your search request</div>;

    if (status === 'pending') return <Loader />;

    if (status === 'rejected') return <ErrorView />;

    if (images.length > 0)
      return (
        <>
          <ImageGallery images={images} />

          {status === 'pending' && <Loader />}
          {status === 'resolved' && <Button onLoad={this.handleLoad} />}
        </>
      );
  }
}

ImageInfo.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ImageInfo;
