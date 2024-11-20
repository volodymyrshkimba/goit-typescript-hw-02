import { Image, ImgInfo } from "../../App.types";

import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: Image;
  onOpenModal: (imgInfo: ImgInfo) => void;
}

const ImageCard = ({ image, onOpenModal }: ImageCardProps) => {
  const handleClick = (): void => {
    onOpenModal({
      regular: image.urls.regular,
      alt: image.alt_description,
      likes: image.likes,
      description: image.description,
      user: image.user.username,
    });
  };
  return (
    <div className={css.item}>
      <img
        className={css.img}
        onClick={handleClick}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
