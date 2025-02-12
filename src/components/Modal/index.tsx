import { useLockedBody } from '../../hooks/useLockedBody';
import { Album } from '../../types';
import Tag from '../Tag';
// Style
import './style.css'

interface ModalProps {
  album: Album;
  handleClose: () => void;
}

const Modal = ({album, handleClose}: ModalProps) => {
  useLockedBody();

  return (
    <div className="modal">
      <div className="modal-background" onClick={handleClose} />
      <div className="modal-contentOuter">
        <div className='modal-contentInner'>
          <img className='modal-image' src={album.image} alt={album.name} height={170} width={170} />
          <div className='modal-divider' />
          <h3 className='modal-header'>{album.name}</h3>
          <div className='modal-tags'>
            <Tag text={album.genre} />
          </div>
          <p className='modal-text'>{album.artist}</p>
          <p className='modal-text'>{album.releaseDate}</p>
        </div>
      </div>
    </div>
  )
}

export default Modal;