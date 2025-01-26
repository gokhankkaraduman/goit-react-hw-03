import { FaTimes } from 'react-icons/fa';
import css from './IsDuplicate.module.css';
import { Player } from '@lottiefiles/react-lottie-player';
import sadAnimation from '../ErrorModal/sadAnimation.json';

function IsDuplicate({ closeModal }) {
  return (
    <div>
      <div className={css.wrapper}>
        <div className={css.btnwrapper}>
          <button className={css.btn} onClick={closeModal}>
            <FaTimes className={css.exiticon} />
          </button>
        </div>
        <p className={css.text}>This contact already exists!</p>
        <Player autoplay loop src={sadAnimation} className={css.animation} />
      </div>
    </div>
  );
}

export default IsDuplicate;
