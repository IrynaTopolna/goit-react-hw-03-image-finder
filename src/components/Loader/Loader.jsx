import { RotatingLines } from 'react-loader-spinner';
import { LoaderStyles } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderStyles>
      <RotatingLines
        strokeColor="#F9721F"
        strokeWidth="5"
        animationDuration="0.75"
        width="150"
        visible={true}
      />
    </LoaderStyles>
  );
};

export default Loader;
