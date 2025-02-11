import {useEffect, useState, FormEvent} from 'react';
// Components
import ListItem from '../ListItem';
import Select from '../Select';
import Pagination from '../Pagination';
import Loader from '../Loader';
// Types
import {Album, Option} from '../../types';
// Style
import './style.css'

const ITEMS_PER_PAGE = 24;

const List = () => {
  const [data, setData] = useState<Album[]>([]);
  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [genreOptions, setGenreOptions] = useState<Option[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');


  useEffect(() => {
    getTopAlbums();
  }, []);

  // set total pages if more than 1 page
  const calculateTotalPages = (totalItems: number) => {
    if (totalItems > ITEMS_PER_PAGE) {
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    } else {
      setTotalPages(1);
    }
  }

  const getTopAlbums = async () => {
    try {
      // get top albums from itunes
      const response = await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json');
      const responseJson = await response.json();
      const dataList: Album[] = [];
      const genreList: string[] = [];
      responseJson.feed.entry.map((entry: Record<string, any>, i) => {
        const entryGenre = entry.category.attributes.label;
        dataList.push({name: entry["im:name"].label, artist: entry["im:artist"].label, link: entry.link.attributes.href, image: entry["im:image"][2].label, genre: entryGenre});
        if (genreList.indexOf(entryGenre) === -1)  {
          genreList.push(entryGenre);
        }
      });

      calculateTotalPages(dataList.length);
      const genres: Option[] = genreList.map((genre) => {
        return {name: genre, value: genre}
      });
      setData(dataList);
      setAlbums(dataList.slice(0, ITEMS_PER_PAGE));
      setGenreOptions(genres);
     } catch(error) {
      console.error(error);
    }
  }

  const handlePageChange = (page: number) => {
    setAlbums(data.slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page));
    setPage(page);
  }

  const handleOptionSelect = (e: FormEvent<HTMLSelectElement>) => {
    setSelectedGenre(e.currentTarget.value);
    if (e.currentTarget.value === 'all') {
      setAlbums(data.slice(0, ITEMS_PER_PAGE));
      calculateTotalPages(data.length);
      return;
    }
    const newAlbums: Album[] = [];
    data.map((entry) => {
      if (entry.genre === e.currentTarget.value) {
        newAlbums.push(entry);
      }
    })
    setAlbums(newAlbums);
    calculateTotalPages(newAlbums.length);
  }

  return (
    <div className="list">
      <div className="list-sorting">
        <div className="list-filters">
          <Select options={[{value: 'all', name: 'All genres'}, ...genreOptions]} handleSelect={handleOptionSelect} value={selectedGenre} />
        </div>
        <div className="list-sort">
          <div className="list-selectionItem">
            <div className="list-sortLabel">Sort by</div>
            <Select options={[{value: 'artist ', name: 'Artist ↑'}, {value: 'Artist des', name: 'Artist ↓'} ]} />
          </div>
        </div>
      </div>
      {albums.length ? (
        <div className="list-content">
          {albums.map((album, i) => <ListItem album={album} key={`album-${i}`} />)}
        </div> ) : (
          <div className='list-loader'>
            <Loader />
          </div>
      )}
      <Pagination totalPages={totalPages} page={page} handlePageChange={handlePageChange} />
    </div>

  );
};

export default List;
