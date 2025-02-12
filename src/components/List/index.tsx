import {useEffect, useState, FormEvent, useCallback} from 'react';
// Components
import Filters from '../Filters';
import ListItem from '../ListItem';
import Pagination from '../Pagination';
import Loader from '../Loader';
import Modal from '../Modal';
// Types
import {Album, Option, SortOptions, ITunesResponse} from '../../types';
// Helpers
import { sortAlbumAscending, sortAlbumDescending, sortArtistAscending, sortArtistDescending } from '../../helpers/sort';
import {createLists} from '../../helpers/list';
import { yearOptions, checkIfInDecade } from '../../helpers/releaseYears';
// Api
import { fetchAlbums } from '../../api/api';
// Style
import './style.css'

const ITEMS_PER_PAGE = 24;

const List = () => {
  const [data, setData] = useState<Album[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [genreOptions, setGenreOptions] = useState<Option[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOptions>(SortOptions.ARTIST_ASC);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  // set total pages if more than 1 page
  const calculateTotalPages = (totalItems: number) => {
    if (totalItems > ITEMS_PER_PAGE) {
      setTotalPages(Math.ceil(totalItems / ITEMS_PER_PAGE));
    } else {
      setTotalPages(1);
    }
  }

  const displayTopAlbums =  useCallback((responseJson: ITunesResponse) => {
    const {dataList, genreList} = createLists(responseJson);

    const genres: Option[] = genreList.map((genre: string) => {
      return {name: genre, value: genre}
    });

    setData(dataList);
    setAlbums(dataList);
    calculateTotalPages(dataList.length);
    setLoading(false);
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
    setPage(page);
  }

  const resortAlbums = ({decade, genre}: {decade: string, genre: string}) => {
    const newAlbums: Album[] = [];
    data.map((entry) => {
      const isInDecade = checkIfInDecade(entry.releaseYear, decade);
      const isSameGenre = genre === 'all' || entry.genre === genre;
      if (isSameGenre && isInDecade) {
        newAlbums.push(entry);
      }
    });
    setPage(1);
    setAlbums(newAlbums);
    setLoading(false);
    calculateTotalPages(newAlbums.length);
  }

  const handleYearSelect = (e: FormEvent<HTMLSelectElement>) => {
    const newDecade = e.currentTarget.value;
    setSelectedYear(newDecade);
    resortAlbums({decade: newDecade, genre: selectedGenre})
  }

  const handleGenreSelect = (e: FormEvent<HTMLSelectElement>) => {
    const newGenre = e.currentTarget.value;
    setSelectedGenre(newGenre);
    resortAlbums({decade: selectedYear, genre: newGenre});
  }

  const handleSortSelect = (e: FormEvent<HTMLSelectElement>) => {
    const selected = e.currentTarget.value;
    let newDataList: Album[] = [];
    if (selected === SortOptions.ARTIST_ASC) {
      newDataList = sortArtistAscending(data);
    } else if (selected === SortOptions.ARTIST_DESC) {
      newDataList = sortArtistDescending(data);
    } else if (selected === SortOptions.ALBUM_ASC) {
      newDataList = sortAlbumAscending(data);
    } else if (selected === SortOptions.ALBUM_DESC) {
      newDataList = sortAlbumDescending(data);
    }
    setData(newDataList);
    resortAlbums({decade: selectedYear, genre: selectedGenre});
    setSelectedSort(selected as SortOptions);
  }

  return (
    <>
      <div className="list">
        <Filters
          genreOptions={genreOptions}
          handleGenreSelect={handleGenreSelect}
          selectedGenre={selectedGenre}
          yearOptions={yearOptions}
          handleYearSelect={handleYearSelect}
          selectedYear={selectedYear}
          selectedSort={selectedSort}
          handleSortSelect={handleSortSelect}
        />
        {!!albums.length && (
          <div className="list-content">
            {albums.slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page).map((album, i) => <ListItem album={album} key={`album-${i}`} handleSelect={() => {setSelectedAlbum(album)}} />)}
          </div>
        )}
        {!albums.length && !error && loading && (
          <div className='list-loader'>
            <Loader />
          </div>
        )}
        {!albums.length && !error && !loading && (
          <p className='list-error'>
            We can’t find any albums that meet your criteria. Please update your selection.
          </p>
        )}
        {!albums.length && !!error && (
          <p className='list-error'>{error}</p>
        )}
        {!!albums.length && <Pagination totalPages={totalPages} page={page} handlePageChange={handlePageChange} />}
      </div>
      {selectedAlbum && <Modal album={selectedAlbum} handleClose={() => {setSelectedAlbum(null)}} />}
    </>
  );
};

export default List;
