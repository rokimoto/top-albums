import {useEffect, useState, FormEvent, useCallback} from 'react';
// Components
import ListItem from '../ListItem';
import Select from '../Select';
import Pagination from '../Pagination';
import Loader from '../Loader';
// Types
import {Album, Option, SortOptions, ITunesEntry, ITunesResponse} from '../../types';
// Helpers
import { sortAlbumAscending, sortAlbumDescending, sortArtistAscending, sortArtistDescending } from '../../helpers/sort';
// Api
import { fetchAlbums } from '../../api/api';
// Style
import './style.css'


const ITEMS_PER_PAGE = 24;

const List = () => {
  const [data, setData] = useState<Album[]>([]);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [genreOptions, setGenreOptions] = useState<Option[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOptions>(SortOptions.ARTIST_ASC);

  // set total pages if more than 1 page
  const calculateTotalPages = (totalItems: number) => {
    if (totalItems > ITEMS_PER_PAGE) {
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    } else {
      setTotalPages(1);
    }
  }

  const displayTopAlbums =  useCallback((responseJson: ITunesResponse) => {
    let dataList: Album[] = [];
    const genreList: string[] = [];
    responseJson.feed.entry.map((entry: ITunesEntry) => {
      const entryGenre = entry.category.attributes.label || '';
      dataList.push({name: entry["im:name"].label, artist: entry["im:artist"].label, link: entry.link.attributes.href, image: entry["im:image"][2].label, genre: entryGenre});
      if (genreList.indexOf(entryGenre) === -1)  {
        genreList.push(entryGenre);
      }
    });
    calculateTotalPages(dataList.length);
    const genres: Option[] = genreList.map((genre) => {
      return {name: genre, value: genre}
    });
    // sort by artist by default on load
    dataList = sortArtistAscending(dataList);
    setData(dataList);
    setAlbums(dataList.slice(0, ITEMS_PER_PAGE));
    setGenreOptions(genres);

  }, []);

  const getTopAlbums = useCallback(async () => {
    try {
      const responseJson = await fetchAlbums();
      displayTopAlbums(responseJson);
    } catch {
      setError('There was an error fetching the top albums. Please try again later.');
    }

  }, [displayTopAlbums]);



  useEffect(() => {
    getTopAlbums();
  }, [getTopAlbums]);

  const handlePageChange = (page: number) => {
    setAlbums(data.slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page));
    setPage(page);
  }


  const resortByGenre = (newGenre: string) => {
    setPage(1);
    setSelectedGenre(newGenre);
    if (newGenre === 'all') {
      setAlbums(data.slice(0, ITEMS_PER_PAGE));
      calculateTotalPages(data.length);
      return;
    }
    const newAlbums: Album[] = [];
    data.map((entry) => {
      if (entry.genre === newGenre) {
        newAlbums.push(entry);
      }
    })
    setAlbums(newAlbums);
    calculateTotalPages(newAlbums.length);
  }


  const handleGenreSelect = (e: FormEvent<HTMLSelectElement>) => {
    const newGenre = e.currentTarget.value;
    console.log('new genre', newGenre)
    resortByGenre(newGenre);
  }

  const handleSortSelect = (e: FormEvent<HTMLSelectElement>) => {
    const selected = e.currentTarget.value;
    let newDataList: Album[] = [];
    if (selected === SortOptions.ARTIST_ASC) {
      newDataList = sortArtistAscending(data);
      console.log('newDataList', newDataList)
    } else if (selected === SortOptions.ARTIST_DESC) {
      newDataList = sortArtistDescending(data);
    } else if (selected === SortOptions.ALBUM_ASC) {
      newDataList = sortAlbumAscending(data);
    } else if (selected === SortOptions.ALBUM_DESC) {
      newDataList = sortAlbumDescending(data);
    }
    setData(newDataList);
    resortByGenre(selectedGenre);
    setSelectedSort(selected as SortOptions);
  }

  const selectSortOptions: Option[] = [];
  Object.entries(SortOptions).forEach(([, value]) => {
    selectSortOptions.push({name: value, value: value});
  })

  return (
    <div className="list">
      <div className="list-sorting">
        <div className="list-filters">
          <Select options={[{value: 'all', name: 'All genres'}, ...genreOptions]} handleSelect={handleGenreSelect} value={selectedGenre} />
        </div>
        <div className="list-sort">
          <div className="list-selectionItem">
            <div className="list-sortLabel">Sort by</div>
            <Select options={selectSortOptions} value={selectedSort} handleSelect={handleSortSelect} />
          </div>
        </div>
      </div>
      {!!albums.length && (
        <div className="list-content">
          {albums.map((album, i) => <ListItem album={album} key={`album-${i}`} />)}
        </div>
      )}
      {!albums.length && !error && (
        <div className='list-loader'>
          <Loader />
        </div>
      )}
      {!albums.length && !!error && (
        <p className='list-error'>{error}</p>
      )}
      {!!albums.length && <Pagination totalPages={totalPages} page={page} handlePageChange={handlePageChange} />}
    </div>

  );
};

export default List;
