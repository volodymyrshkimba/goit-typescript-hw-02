import { Image, ImgInfo } from "../../App.types";

import ImageCard from "../ImageCard/ImageCard";

import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: Image[];
  onOpenModal: (imgInfo: ImgInfo) => void;
}

const ImageGallery = ({ images, onOpenModal }: ImageGalleryProps) => {
  return (
    <ul className={css.list}>
      {images.map((image) => {
        return (
          <li key={image.id}>
            <ImageCard image={image} onOpenModal={onOpenModal} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
