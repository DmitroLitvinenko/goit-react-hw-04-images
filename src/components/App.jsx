import { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { fetchImages } from '../api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.fetchImages();
    }
    if (prevState.images.length !== this.state.images.length) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onChangeQuery = query => {
    this.setState({ query, page: 1, images: [] });
  };

  fetchImages = () => {
    const { query, page } = this.state;
    const params = { query, page };

    this.setState({ loading: true });

    fetchImages(params)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }))
      )
      .finally(() => this.setState({ loading: false }));
  };

  openModal = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: '' });
  };

  render() {
    const { images, loading, showModal, largeImageURL } = this.state;
    const shouldRenderLoadMoreButton = images.length > 0 && !loading;

    return (
      <div className="App">
        <SearchBar onSubmit={this.onChangeQuery} />
        <ImageGallery images={images} onClick={this.openModal} />
        {loading && <Loader />}

        {shouldRenderLoadMoreButton && <Button onClick={this.fetchImages} />}
        {showModal && <Modal onClose={this.closeModal} src={largeImageURL} />}
      </div>
    );
  }
}
