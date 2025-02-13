// Components
import Button from '../Button';
// Icons
import Apple from '../../icons/Apple';
// Hooks
import { useLockedBody } from '../../hooks/useLockedBody';
// Types
import { Album } from '../../types';
// Style
import './style.css'

interface ModalProps {
  /**
   * The album that is displayed inside the modal
   */
  album: Album;
  /**
   * The function that is run when the modal is closed
   */
  handleClose: () => void;
}

const Modal = ({album, handleClose}: ModalProps) => {
  useLockedBody();

  return (
    <div className="modal">
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-contentOuter">
        <div className='modal-contentInner'>
          <div className='modal-close' onClick={handleClose}>&#x2612;</div>
          <img className='modal-image' src={album.image} alt={album.name} height={170} width={170} />
          <h3 className='modal-header'>{album.name}</h3>
          <p className='modal-artist'>{album.artist}</p>
          <p className='modal-info'>{album.genre} &middot; {album.releaseYear}</p>
          <a href={album.itunesUrl} target="_blank">
            <Button text={<>View on&nbsp;<Apple size={24} /> Music</>} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Modal;