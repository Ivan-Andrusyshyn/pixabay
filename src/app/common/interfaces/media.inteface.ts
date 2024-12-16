interface Media {
  comments: number;
  downloads: number;
  id: number;
  likes: number;
  tags: string[];
}

interface Video extends Media {
  video?: {
    url: string;
    width: number;
    height: number;
    size: number;
    thumbnail: string;
  };
}
interface Image extends Media {
  largeImageURL?: string;
}

type MediaItem = Image | Video;

export { MediaItem, Video, Image };
