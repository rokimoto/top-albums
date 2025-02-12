export interface Album {
  name: string;
  artist: string;
  link: string;
  image: string;
  genre: string;
  releaseYear: string;
  itunesUrl: string;
}

export interface Option {
  value: string;
  name: string;
}

export enum SortOptions {
  ARTIST_ASC = 'Artist name \u2191',
  ARTIST_DESC = 'Artist name \u2193',
  ALBUM_ASC = 'Album name \u2191',
  ALBUM_DESC = 'Album name \u2193',
}

interface ITunesImage {
  label: string;
  attributes: {
    height: string;
  }
}

export interface ITunesEntry {
  "im:name": {
    label: string
  }
  "im:image": ITunesImage[];
  "im:itemCount": {
    label: string;
  }
  "im:price": {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    }
  }
  "im:contentType": {
    "im:contentType": {
      attributes: {
        term: string;
        label: string;
      }
    },
    attributes: {
      term: string;
      label: string;
    }
  }
  rights: {
    label: string;
  },
  title: {
    label: string;
  },
  link: {
    attributes: {
      rel: string;
      type: string;
      href: string;
    }
  },
  id: {
    label: string;
    attributes: {
      "im:id": string;
    }
  },
  "im:artist": {
    label: string;
    attributes: {
      href: string;
    }
  },
  category: {
    attributes: {
      "im:id": string;
      term: string;
      scheme: string;
      label: string;
    }
  },
  "im:releaseDate": {
    label: string;
    attributes: {
      label: string;
    }
  }
}

export interface ITunesResponse {
  feed: {
    author: {
      name: {
        label: string;
      }
      uri: {
        label: string;
      }
    }
    entry: ITunesEntry[];
  }
}
