import { Category, Order } from '../content/filter';
import apiKay from './apiKey';
import imageUrl from './image-url.enum';

const requestBuilder = (
  pageIndex: number,
  perPage: number,
  value: string = '',
  options: string[]
) => {
  let url = `${imageUrl.base}?key=${apiKay}&page=${pageIndex}&per_page=${perPage}`;

  for (let i = 0; i < options.length; i++) {
    console.log(i);

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
