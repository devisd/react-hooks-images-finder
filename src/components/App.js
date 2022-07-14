import React, { Component } from 'react';
import imageApi from '../services/image-api';
import Container from './Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button/Button';
import Modal from './Modal';
import Error from './Error';
import Loader from './Loader';

class App extends Component {
  state = {
    searchQuery: '',
    hits: [],
    currentPage: 1,
    modal: false,
    modalImage: '',
    status: 'idle',
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.setState({
        status: 'pending',
      });
      this.fetchImg();
    }
  }

  handleInputChange = data => {
    this.setState({ searchQuery: data.trim(), currentPage: 1, hits: [] });
  };

  fetchImg = () => {
    const { searchQuery, currentPage } = this.state;
    const option = { searchQuery, currentPage };

    if (!searchQuery) return;

    imageApi(option)
      .then(result => {
        this.setState(prevState => ({
          status: 'resolved',
          hits: [...prevState.hits, ...result],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error =>
        this.setState({
          error,
          status: 'rejected',
        })
      );
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  handleModalOpen = largeImageUrl => {
    this.setState({ modal: true, modalImage: largeImageUrl });
  };

  handleModalClose = () => {
    this.setState({ modal: false, modalImage: '' });
  };

  render() {
    const { hits, modal, modalImage, status, error } = this.state;

    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleInputChange} />
          <h2 className="ImageGallery__title_text">
            Введите тему изображений для поиска
          </h2>
        </Container>
      );
    }

    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleInputChange} />
          <Loader />
        </Container>
      );
    }

    if (status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={this.handleInputChange} />
          <Error message={error.message} />
        </Container>
      );
    }

    if (status === 'resolved') {
      return (
        <div>
          <Container>
            <Searchbar onSubmit={this.handleInputChange} />
            <ImageGallery hits={hits} onImageClick={this.handleModalOpen} />
            <Button onLoadClick={this.fetchImg} text="Load more" />
          </Container>
          {modal && (
            <Modal onClose={this.handleModalClose}>
              <img src={modalImage} alt="" />
            </Modal>
          )}
        </div>
      );
    }
  }
}

export default App;
