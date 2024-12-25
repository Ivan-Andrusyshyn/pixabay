interface Media {
  comments: number;
  downloads: number;
  mediaId: number;
  likes: number;
  _id?: number;
  isInGallery: boolean;
  tags: string[];
  userId?: number;
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

interface MediaResponse {
  media: MediaItem[];
  message: string;
}
interface MediaIdResponse {
  message: string;
  ids: number[];
}
export { MediaItem, Video, Image, MediaIdResponse, MediaResponse };
