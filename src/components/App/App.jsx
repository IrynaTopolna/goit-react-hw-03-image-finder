import ImageInfo from '../ImageInfo';
import { Component } from 'react';
import Searchbar from '../Searchbar';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from 'GlobalStyles';
import Layout from 'Layout/Layout';
import { AppStyles } from './App.styled';

class App extends Component {
  state = {
    searchWord: '',
    showModal: false,
  };

  onInputChange = searchWord => {
    console.log(searchWord);
    this.setState({ searchWord });
  };

  render() {
    const { searchWord } = this.state;

    return (
      <Layout>
        <AppStyles>
          <Toaster
            toastOptions={{
              duration: 1500,
            }}
          />
          <Searchbar onSearch={this.onInputChange} />
          <ImageInfo value={searchWord} />
          <GlobalStyles />
        </AppStyles>
      </Layout>
    );
  }
}

export default App;
