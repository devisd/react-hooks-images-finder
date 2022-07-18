import errorImage from './error.jpg';
import './Error.css';

export default function ErrorView() {
  return (
    <div>
      <img className="error__img" src={errorImage} alt="всё пропало" />
      <h2 className="error__text">Что-то пошло не так. Попробуйте еще раз</h2>
    </div>
  );
}
