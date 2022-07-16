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

  // state = {
  //   searchQuery: '',
  //   hits: [],
  //   currentPage: 1,
  //   modal: false,
  //   modalImage: '',
  //   status: 'idle',
  //   error: null,
  // };

  useEffect(() => fetchImg(), [searchQuery]);

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.searchQuery !== this.state.searchQuery) {
  //     this.setState({
  //       status: 'pending',
  //     });
  //     this.fetchImg();
  //   }
  // }

  function handleInputChange(data) {
    setSearchQuery(data.trim());
    setStatus('pending');

    // this.setState({ searchQuery: data.trim(), currentPage: 1, hits: [] });
  }

  const fetchImg = () => {
    // const { searchQuery, currentPage } = this.state;
    const option = { searchQuery, currentPage };
    console.log(option);

    if (!searchQuery) return;

    imageApi(option)
      .then(result => {
        setHits(prevState => [...prevState, ...result]);
        setCurrentPage(prevState => prevState + 1);
        setStatus('resolved');
        // this.setState(prevState => ({
        //   status: 'resolved',
        //   hits: [...prevState.hits, ...result],
        //   currentPage: prevState.currentPage + 1,
        // }));
      })
      .catch(
        error => {
          setError(error);
          setStatus('rejected');
        }
        // this.setState({
        //   error,
        //   status: 'rejected',
        // })
      );
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleModalOpen = largeImageUrl => {
    setModal(true);
    setModalImage(largeImageUrl);
    // this.setState({ modal: true, modalImage: largeImageUrl });
  };

  const handleModalClose = () => {
    setModal(false);
    setModalImage('');
    // this.setState({ modal: false, modalImage: '' });
  };

  // render() {
  // const { hits, modal, modalImage, status, error } = this.state;

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
// }

export default App;
