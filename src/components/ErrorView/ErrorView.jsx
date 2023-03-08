import errorImg from '../error.jpg';
import { Wrap } from './ErrorView.styled';

const ErrorView = () => {
  return (
    <Wrap role="alert">
      <img src={errorImg} width="360" alt="something went wrong" />
      <h1>No images were found :(</h1>;
    </Wrap>
  );
};

export default ErrorView;
