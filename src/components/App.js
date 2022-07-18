import { useEffect, useState } from 'react';
import imageApi from '../services/image-api';
import Container from './Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button/Button';
import Modal from './Modal';
import Error from './Error';
import Loader from './Loader';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const fetchImg = () => {
      const option = { searchQuery, currentPage };
      setStatus('pending');

      imageApi(option)
        .then(result => {
          setHits(prevState => [...prevState, ...result]);
          setStatus('resolved');
        })
        .catch(error => {
          setError(error.message);
          setStatus('rejected');
        });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    };

    fetchImg();
  }, [currentPage, searchQuery]);

  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleInputChange = data => {
    setSearchQuery(data.trim());
    setCurrentPage(1);
    setHits([]);
    setError(null);
  };

  const handleModalOpen = largeImageUrl => {
    setModal(true);
    setModalImage(largeImageUrl);
  };

  const handleModalClose = () => {
    setModal(false);
    setModalImage('');
  };

  if (status === 'idle') {
    return (
      <Container>
        <Searchbar onSubmit={handleInputChange} />
        <h2 className="ImageGallery__title_text">
          Введите тему изображений для поиска
        </h2>
      </Container>
    );
  }
  if (status === 'pending') {
    return (
      <Container>
        <Searchbar onSubmit={handleInputChange} />
        {hits && <ImageGallery hits={hits} onImageClick={handleModalOpen} />}
        <Loader />
      </Container>
    );
  }
  if (status === 'rejected') {
    return (
      <Container>
        <Searchbar onSubmit={handleInputChange} />
        <Error message={error.message} />
      </Container>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <Container>
          <Searchbar onSubmit={handleInputChange} />
          <ImageGallery hits={hits} onImageClick={handleModalOpen} />
          <Button onLoadClick={updatePage} text="Load more" />
        </Container>
        {modal && (
          <Modal onClose={handleModalClose}>
            <img src={modalImage} alt="" />
          </Modal>
        )}
      </>
    );
  }
};

export default App;
