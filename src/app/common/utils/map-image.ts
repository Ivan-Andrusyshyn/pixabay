import Image from '../interfaces/image.interface';

const splitTags = (tags: any) => {
  return tags ? tags.split(',').map((tag: string) => tag.trim()) : [];
};

const buildImageObject = (images: Image[]) =>
  images.map((image) => {
    return {
      tags: splitTags(image.tags),
      id: image.id,
      likes: image.likes,
      comments: image.comments,
      downloads: image.downloads,
      largeImageURL: image.largeImageURL,
    };
  });

const getImagesIds = (images: Image[]): number[] => {
  return images.map((image) => image.id);
};

export { buildImageObject, getImagesIds };
