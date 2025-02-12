// Types
import {Album} from '../../types';
// Style
import './style.css'

interface ListItemProps {
  album: Album;
  handleSelect: () => void;
}

const ListItem = ({ album, handleSelect }: ListItemProps) => {
  return (
  <div className="listItem" onClick={handleSelect}>
    <img className='listItem-image' src={album.image} alt={album.name} />
    <div className='listItem-content'>
      <h2 className="listItem-name">{album.name}</h2>
      <p className="listItem-artist">{album.artist}</p>
    </div>
  </div>
  );
};

export default ListItem;
