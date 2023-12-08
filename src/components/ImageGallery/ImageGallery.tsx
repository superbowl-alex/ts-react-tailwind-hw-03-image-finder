import { FC } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { Hit  } from '../../Services/fetchImages';

interface IImageGallery {
  items: Hit[];
}

const ImageGallery: FC<IImageGallery> = ({ items }) => {
  return (
    <Gallery>
      {items.map((item: Hit) => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </Gallery>
  );
};

export default ImageGallery;
