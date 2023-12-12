import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OnlyScroll from 'only-scrollbar';
import {
  fetchImagesWithQuery,
  HITS_PER_PAGE,
  Hit
} from '../../Services/fetchImages';
import Searchbar from '../Searchbar';
import Button from '../Button';
import ImageGallery from '../ImageGallery';
import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';

// Creating an instance of a class OnlyScroll (adds inertia for increased smoothness)
new OnlyScroll(document.scrollingElement, {
  damping: 0.8,
});

export type AppState = {
  page: number;
  query: string;
  items: Hit[];
  isLoading: boolean;
  error: boolean;
  endOfCollection: boolean;
};


export default class App extends Component<{}, AppState> {
  state: AppState = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
    error: false,
    endOfCollection: false,
  };

  async componentDidUpdate(_: any, prevState: AppState): Promise<void> {
    const { page, query } = this.state;
    const { page: prevPage, query: prevQuery } = prevState;
    if (query === '') {
      return;
    } else if (prevPage !== page || prevQuery !== query) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchImagesWithQuery(query, page);
        const images: Hit[] = response.data.hits;
        this.validationData(images);
        const totalPages: number = Math.ceil(response.data.totalHits / HITS_PER_PAGE);
        this.checkEndCollection(page, totalPages);
        this.setState(({ items }) => ({
          items: [...items, ...images],
        }));
      } catch (error) {
        this.setState({ error: true });
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  formSubmitHandler = ( search: string ): void => {
    this.setState({
      page: 1,
      query: search.trim(),
      items: [],
      isLoading: false,
      error: false,
      endOfCollection: false,
    });
  };

  loadMore = (): void => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  validationData = (data: Hit[]): void => {
    if (data.length === 0) {
      toast.warn(
        ' Sorry, there are no images matching your search query. Please try again.',
        {
          theme: 'colored',
        }
      );
    }
  };

  checkEndCollection = (currentPage: number, total: number): void => {
    if (currentPage === total) {
      this.setState({ endOfCollection: true });
      toast.info("We're sorry, but you've reached the end of search results.", {
        theme: 'colored',
      });
    }
  };

  render() {
    const { items, isLoading, error, endOfCollection } = this.state;

    return (
      <div className='grid grid-cols-1 gap-4 pb-4'>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery items={items} />
        {error && <ErrorMessage />}
        {isLoading && <Loader />}
        {items.length > 0 && !endOfCollection && (
          <Button loadMore={this.loadMore} isSubmitting={isLoading} />
        )}
        <ToastContainer />
      </div>
    );
  }
}
