import errorImg from '../error.jpg';

const ErrorView = () => {
  return (
    <div role="alert">
      <img src={errorImg} width="360" alt="something went wrong" />
      <h1>No images were found :(</h1>;
    </div>
  );
};

export default ErrorView;
