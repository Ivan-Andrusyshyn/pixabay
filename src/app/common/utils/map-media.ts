import { MediaItem } from '../interfaces/media.interface';

const splitTags = (tags: any) => {
  return tags ? tags.split(',').map((tag: string) => tag.trim()) : [];
};

const buildMediaObject = (isImages: boolean, data: MediaItem[]) => {
  let idList: number[] = [];
  const mediaList = data.map((item: any) => {
    let media = {
      tags: splitTags(item.tags),
      mediaId: item.id,
      likes: item.likes,
      comments: item.comments,
      downloads: item.downloads,
      isInGallery: false,
    };
    idList.push(item.id);
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
  return { mediaList, idList };
};
const getImagesIds = (media: MediaItem[]): number[] => {
  return media.map((item) => item.mediaId);
};

export { buildMediaObject, getImagesIds };
