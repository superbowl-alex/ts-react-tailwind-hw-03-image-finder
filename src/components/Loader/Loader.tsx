import { FC } from 'react';
import { Audio } from 'react-loader-spinner';
import { WrapSpinner } from './Loader.styled';

const Loader: FC = () => {
  return (
    <WrapSpinner>
      <Audio color="#379683" ariaLabel="audio-loading" />
    </WrapSpinner>
  );
};

export default Loader;
