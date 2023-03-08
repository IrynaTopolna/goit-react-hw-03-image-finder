import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonLabel,
  Form,
  Input,
  SearchbarStyles,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleInput = evt => {
    const value = evt.currentTarget.value.toLowerCase();
    this.setState({ value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    this.setState({ value: '' });
    this.props.onSearch(this.state.value.trim());
  };

  render() {
    return (
      <SearchbarStyles>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleInput}
          />
        </Form>
      </SearchbarStyles>
    );
  }
}

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Searchbar;
