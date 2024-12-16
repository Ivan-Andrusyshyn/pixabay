import { MediaItem } from '../interfaces/media.inteface';

const splitTags = (tags: any) => {
  return tags ? tags.split(',').map((tag: string) => tag.trim()) : [];
};

const buildMediaObject = (isImages: boolean, data: MediaItem[]) =>
  data.map((item: any) => {
    let media = {
      tags: splitTags(item.tags),
      id: item.id,
      likes: item.likes,
      comments: item.comments,
      downloads: item.downloads,
    };
    return isImages
      ? {
          ...media,
          largeImageURL: item.largeImageURL,
        }
      : {
          ...media,
          video: {
            ...item.videos.medium,
          },
        };
  });

const getImagesIds = (media: MediaItem[]): number[] => {
  return media.map((item) => item.id);
};

export { buildMediaObject, getImagesIds };
