onmessage = function (e) {

  const tempImages = [];

  e.data.forEach((image) => {
    if (image.id) {
      tempImages.push(image);
    }
  });

  postMessage(tempImages);
}