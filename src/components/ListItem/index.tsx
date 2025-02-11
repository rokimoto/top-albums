// Types
import {Album} from '../../types';
// Style
import './style.css'

interface ListItemProps {
  album: Album
}

const ListItem = ({ album }: ListItemProps) => {
  return (
  <div className="listItem">
    <img className='listItem-image' src={album.image} />
    <div className='listItem-content'>
      <h2 className="listItem-name">{album.name}</h2>
      <p className="listItem-artist">{album.artist}</p>
    </div>
  </div>
  );
};

export default ListItem;
