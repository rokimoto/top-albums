// Types
import { Album } from "../types"

export const sortArtistAscending = (data: Album[]) => {
  return data.sort((a, b) => a.artist.localeCompare(b.artist))
}

export const sortArtistDescending = (data: Album[]) => {
  return data.sort((a, b) => b.artist.localeCompare(a.artist))
}

export const sortAlbumAscending = (data: Album[]) => {
  return data.sort((a, b) => a.name.localeCompare(b.name))
}

export const sortAlbumDescending = (data: Album[]) => {
  return data.sort((a, b) => b.name.localeCompare(a.name))
}
