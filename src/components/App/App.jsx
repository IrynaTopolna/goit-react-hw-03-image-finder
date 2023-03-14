import { Component } from 'react';
import Searchbar from '../Searchbar';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from 'GlobalStyles';
import Layout from 'Layout/Layout';
import { AppStyles, Greet } from './App.styled';
import { getImages } from 'api/images-api';
import ErrorView from 'components/ErrorView';
import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';

const PER_PAGE = 12;

class App extends Component {
  state = {
    images: [],
    searchWord: '',
    status: 'idle',
    page: 1,
    showModal: false,
    totalImages: 0,
  };

  componentDidUpdate(_, prevState) {
    const searchWord = this.state.searchWord;

    if (prevState.searchWord !== searchWord) {
      this.setState({ status: 'pending', images: [] });
      setTimeout(() => {
        this.handleRequest();
      }, 100);
      return;
    }

    if (
      prevState.searchWord === searchWord &&
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      this.handleRequest();
    }
  }

  handleRequest = () => {
    const searchWord = this.state.searchWord;
    const page = this.state.page;

    getImages(searchWord, page, PER_PAGE)
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
          totalImages: images.totalHits,
        });
      })
      .catch(error => {
        this.setState({ error, status: 'rejected' });
      });
  };

  handleLoad = () => {
    this.setState(prev => ({ page: prev.page + 1, status: 'pending' }));
    console.log(this.state.searchWord);
    console.log('page', this.state.page + 1);
  };

  onInputChange = searchWord => {
    console.log(searchWord);
    console.log('page', 1);
    this.setState({ searchWord, page: 1 });
  };

  render() {
    const { status, images, page, totalImages } = this.state;
    const pages = Math.round(totalImages / PER_PAGE);

    return (
      <Layout>
        <AppStyles>
          <Toaster
            toastOptions={{
              duration: 1500,
            }}
          />
          <Searchbar onSearch={this.onInputChange} />
          {status === 'idle' && (
            <Greet>
              Welcome to images and photos finder! Please, enter your search
              request
            </Greet>
          )}

          {status === 'rejected' && <ErrorView />}
          {images.length > 0 && (
            <>
              <ImageGallery images={images} page={page} />
              {status === 'resolved' && page <= pages && (
                <Button onLoad={this.handleLoad} />
              )}
            </>
          )}
          {status === 'pending' && <Loader />}
        </AppStyles>
        <GlobalStyles />
      </Layout>
    );
  }
}

export default App;
