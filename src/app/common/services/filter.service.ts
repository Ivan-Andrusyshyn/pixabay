import { Injectable } from '@angular/core';

import imageUrl from '../utils/image-url.enum';
import apiKay from '../utils/apiKey';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  buildRequest(
    pageIndex: number,
    perPage: number,
    value: string = '',
    options: { category?: string; order?: string }
  ) {
    let url = `${imageUrl.base}?key=${apiKay}&page=${pageIndex}&per_page=${perPage}`;

    if (value?.trim()) {
      url += `&q=${value}`;
    }
    if (options.order?.trim()) {
      url += `&order=${options.order}`;
    }
    if (options.category?.trim()) {
      url += `&category=${options.category}`;
    }

    return url;
  }
}
