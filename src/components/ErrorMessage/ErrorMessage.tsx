import { FC } from 'react';
import { ErrorAllert } from './ErrorMessage.styled';

const ErrorMessage: FC = () => {
  return (
    <ErrorAllert>Something went wrong. Please, try again later</ErrorAllert>
  );
};

export default ErrorMessage;
