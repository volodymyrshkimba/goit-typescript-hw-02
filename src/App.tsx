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
