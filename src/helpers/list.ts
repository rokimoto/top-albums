
// Types
import { ITunesResponse, Album, ITunesEntry } from "../types";
// Helpers
import { sortArtistAscending } from "./sort";

/**
 * Function to create genre and album lists based on iTunes response data
 */
export const createLists = (responseJson: ITunesResponse) => {
  let dataList: Album[] = [];
  const genreList: string[] = [];
  responseJson.feed.entry.map((entry: ITunesEntry) => {
    const entryGenre = entry.category.attributes.label;
    const releaseYear = new Date(entry['im:releaseDate'].label).getFullYear();
    dataList.push({name: entry["im:name"].label, artist: entry["im:artist"].label, link: entry.link.attributes.href, image: entry["im:image"][2].label, genre: entryGenre, releaseYear: releaseYear.toString(), itunesUrl: entry.link.attributes.href});
    if (genreList.indexOf(entryGenre) === -1)  {
      genreList.push(entryGenre);
    }
  });

  // sort by artist by default initially
  dataList = sortArtistAscending(dataList);

  return {genreList, dataList};
}