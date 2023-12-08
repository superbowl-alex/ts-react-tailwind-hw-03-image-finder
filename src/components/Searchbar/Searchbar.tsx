import { FC } from 'react';
import { Formik } from 'formik';
import { FcSearch } from 'react-icons/fc';
import {
  SearchHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

interface ISearchbar {
  onSubmit: (search: string) => void;
}

const Searchbar: FC<ISearchbar> = ({ onSubmit }) => {
  const handleSubmit = async (values: { search: string }) => {
    await onSubmit(values.search);
  };
  return (
    <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <SearchHeader>
          <SearchForm>
            <SearchFormButton type="submit" disabled={isSubmitting}>
              <FcSearch size={28} />
            </SearchFormButton>
            <SearchFormInput
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </SearchHeader>
      )}
    </Formik>
  );
};

export default Searchbar;
