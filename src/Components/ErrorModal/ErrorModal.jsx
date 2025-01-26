
import { FaTimes } from "react-icons/fa";
import css from './ErrorModal.module.css'
import { Player } from "@lottiefiles/react-lottie-player";
import sadAnimation from './sadAnimation.json'

function ErrorModal ({handleClick}){
    return (
        <div>
            <div className={css.wrapper}>
                <div className={css.btnwrapper}>
                    <button className={css.btn} onClick={handleClick}><FaTimes className={css.exiticon}/></button>
                </div>
                <p className={css.text}>We couldn't find anything matching your search.</p>
                <Player
                autoplay
                loop
                src={sadAnimation}
                className={css.animation}
        />
            </div>
        </div>
    )
}
export default ErrorModal;