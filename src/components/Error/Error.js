import errorImage from './error.jpg';
import './Error.css';

export default function ErrorView() {
  return (
    <div>
      <img className="error__img" src={errorImage} alt="всё пропало" />
      <h2 className="error__text">
        Нет искомой темы. Попробуйте ввести другую тему для поиска
      </h2>
    </div>
  );
}
