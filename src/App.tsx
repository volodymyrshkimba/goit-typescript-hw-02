import { useEffect, useState } from "react";

import { Toaster } from "react-hot-toast";

import { requestPhotoByKey } from "./services/api.js";

import css from "./App.module.css";

import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";

interface ImageAlternativeSlugs {
  de: string;
  en: string;
  es: string;
  fr: string;
  it: string;
  ja: string;
  ko: string;
  pt: string;
}

interface ImageLinks {
  download: string;
  download_location: string;
  html: string;
  self: string;
}

interface TopicSubmissions {
  [key: string]: { status: string; approved_on?: string };
}

interface ImageUrls {
  full: string;
  raw: string;
  regular: string;
  small: string;
  small_s3: string;
  thumb: string;
}

interface UserLinks {
  followers: string;
  following: string;
  html: string;
  likes: string;
  photos: string;
  portfolio: string;
  self: string;
}

interface UserProfileImage {
  large: string;
  medium: string;
  small: string;
}

interface User {
  accepted_tos: boolean;
  bio: string | null;
  first_name: string;
  for_hire: boolean;
  id: string;
  instagram_username: string | null;
  last_name: string | null;
  links: UserLinks;
  location: string | null;
  name: string;
  portfolio_url: string | null;
  profile_image: UserProfileImage;
  social: {}; // ====================================================================================================
  total_collections: number;
  total_illustrations: number;
  total_likes: number;
  total_photos: number;
  total_promoted_illustrations: number;
  total_promoted_photos: number;
  twitter_username: string | null;
  updated_at: string;
  username: string;
}

interface Image {
  alt_desctiption: string;
  alternative_slugs: ImageAlternativeSlugs;
  asset_type: string;
  blur_hash: string;
  breadcrumbs: unknown[];
  color: string;
  created_at: string;
  current_user_collections: unknown[];
  description: string | null;
  height: number;
  id: string;
  liked_by_user: boolean;
  likes: number;
  links: ImageLinks;
  promoted_at: string | null;
  slug: string;
  sponsorship: null;
  topic_submissions: TopicSubmissions;
  updated_at: string;
  urls: ImageUrls;
  user: User;
  width: number;
}

function App() {
  const [images, setImages] = useState([]);
  const [keyWord, setKeyword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [modalImageInfo, setModalImageInfo] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const onOpenModal = (imgInfo) => {
    setModalImageInfo(imgInfo);
    setModalIsOpen(true);
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  const onSearch = (userWord) => {
    setKeyword(userWord);
    setError(false);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    images.forEach((image) => {
      const userKeys = Object.keys(image.user.profile_image);

      userKeys.forEach((userKey) => {
        if (image.user.profile_image[userKey] === null) {
          console.log(userKey, "=", image.user.profile_image[userKey]);
        }
      });
    });
  }, [images]);

  useEffect(() => {
    if (!keyWord) return;

    const request = async () => {
      try {
        setLoading(true);
        const response = await requestPhotoByKey(keyWord, page);

        setTotalPages(response.data.total_pages);

        setImages((prevImages) => {
          if (page === 1) {
            return response.data.results;
          }

          return [...prevImages, ...response.data.results];
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    request();
  }, [keyWord, page]);

  return (
    <div className={css.appWrapper}>
      <SearchBar onSearch={onSearch} />
      {(images.length > 0 && (
        <ImageGallery onOpenModal={onOpenModal} images={images} />
      )) ||
        (error && <ErrorMessage />)}
      {loading && <Loader />}
      {page < totalPages && <LoadMoreBtn onLoadMore={onLoadMore} />}
      <Toaster />
      <ImageModal
        modalIsOpen={modalIsOpen}
        modalImageInfo={modalImageInfo}
        closeModal={closeModal}
      />
    </div>
  );
}

export default App;
