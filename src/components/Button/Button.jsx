import PropTypes from 'prop-types';
import { ButtonLoadMore } from './Button.styled';

const Button = ({ onLoad }) => {
  return (
    <ButtonLoadMore type="button" onClick={() => onLoad()}>
      Load more
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default Button;
