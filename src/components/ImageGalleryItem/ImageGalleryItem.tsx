import { Component } from 'react';
import { GalleryItem, GallerryItemImage } from './ImageGalleryItem.styled';
import Modal from '../Modal/Modal';
import { Hit  } from '../../Services/fetchImages';

interface IImageGalleryItem {
  item: Hit;
}

interface IImageGalleryItemState {
  isModalOpen: boolean;
}

class ImageGalleryItem extends Component<IImageGalleryItem, IImageGalleryItemState> {
  constructor(props: IImageGalleryItem) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({ isModalOpen: !isModalOpen }));
  };

  render() {
    const { item } = this.props;
    const { isModalOpen } = this.state;
    return (
      <GalleryItem>
        <GallerryItemImage
          src={item.webformatURL}
          alt={item.tags}
          onClick={this.toggleModal}
        />
        {isModalOpen && <Modal image={item} toggleModal={this.toggleModal} />}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;
