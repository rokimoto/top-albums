const API_URL = `https://itunes.apple.com/us/rss/topalbums`;

export const fetchAlbums = async (limit = 100) => {
  try {
    const response = await fetch(`${API_URL}/limit=${limit}/json`);
    return await response.json();
  } catch (err) {
    console.error(err);
    return err;
  }
}