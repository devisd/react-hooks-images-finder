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

  function handleInputChange(data) {
    setSearchQuery(data.trim());
    setHits([]);
    setCurrentPage(1);
    setStatus('pending');
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchImg = () => {
    const option = { searchQuery, currentPage };

    if (!searchQuery) return;

    imageApi(option)
      .then(result => {
        setHits(prevState => [...prevState, ...result]);
        setCurrentPage(prevState => prevState + 1);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  function handleModalOpen(largeImageUrl) {
    setModal(true);
    setModalImage(largeImageUrl);
  }

  const handleModalClose = () => {
    setModal(false);
    setModalImage('');
  };

  useEffect(() => {
    fetchImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

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
      <div>
        <Container>
          <Searchbar onSubmit={handleInputChange} />
          <ImageGallery hits={hits} onImageClick={handleModalOpen} />
          <Button onLoadClick={fetchImg} text="Load more" />
        </Container>
        {modal && (
          <Modal onClose={handleModalClose}>
            <img src={modalImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
};

export default App;
