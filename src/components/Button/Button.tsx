import { FC } from 'react';
import { ButtonLoadMore } from './Button.styled';

interface IButton {
  loadMore: () => void;
  isSubmitting: boolean;
}

const Button: FC<IButton> = ({ loadMore, isSubmitting }) => {
  return (
    <ButtonLoadMore type="button" onClick={loadMore} disabled={isSubmitting}>
      Load more
    </ButtonLoadMore>
  );
};

export default Button;
