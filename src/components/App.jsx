import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { fetchImagesApi } from 'api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (query !== '') {
      fetchImages();
    }
  }, [query]);

  useEffect(() => {
    if (images.length > 0) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [images]);

  const onChangeQuery = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const fetchImages = () => {
    const options = {
      query,
      page,
    };

    setLoading(true);

    fetchImagesApi(options)
      .then(
        images => setImages(prevState => [...prevState, ...images]),
        setPage(prevState => prevState + 1)
      )

      .finally(() => setLoading(false));
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setLargeImageURL('');
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !loading;

  return (
    <div className="App">
      <SearchBar onSubmit={onChangeQuery} />
      <ImageGallery images={images} onClick={openModal} />
      {loading && <Loader />}

      {shouldRenderLoadMoreButton && <Button onClick={fetchImages} />}
      {showModal && <Modal onClose={closeModal} src={largeImageURL} />}
    </div>
  );
};
