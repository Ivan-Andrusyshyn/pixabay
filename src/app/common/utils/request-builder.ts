import { Category, Order } from '../content/filter';
import apiKay from './apiKey';
import imageUrl from './image-url.enum';

const requestBuilder = (
  isImages: boolean,
  pageIndex: number,
  perPage: number,
  value: string = '',
  options: string[]
) => {
  const pagination = `?key=${apiKay}&page=${pageIndex}&per_page=${perPage}`;
  let url = '';
  if (isImages) {
    url = imageUrl.base + pagination;
  } else {
    url = `${imageUrl.base}/videos` + pagination;
  }
  for (let i = 0; i < options.length; i++) {
    if (Category.includes(options[i])) {
      url += `&category=${options[i]}`;
    }
    if (Order.includes(options[i])) {
      url += `&order=${options[i]}`;
    }
  }

  if (value?.trim()) {
    url += `&q=${value}`;
  }

  return url;
};
export default requestBuilder;
