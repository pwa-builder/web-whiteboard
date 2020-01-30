import { get } from 'idb-keyval';

export const cleanImages = async (images: any[]) => {
  let cleanImages = [];

  images.forEach((image) => {
    if (image.url) {
      cleanImages.push(image);
    }
  });

  if (cleanImages.length > 0) {
    return cleanImages;
  }
}

export const search = async (searchTerm, images) => {
  let searchImages = [];

  if (searchTerm) {
    images.forEach((image) => {
      if (image.tags) {
        image.tags.filter((tag) => {
          console.log(tag);
          if (tag.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
            searchImages.push(image);
          }
        })
      }

      if (image.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        searchImages.push(image);
      }
    });

    if (searchImages.length > 0) {
      return searchImages;
    }
    else {
      return await get('images');
    }
  }
  else {
    return await get('images');
  }
}