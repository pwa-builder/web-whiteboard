onmessage = function (e) {

  console.log(e.data.name);
  console.log(e.data.data);

  if (e.data.name === "cloudImages") {
    const tempImages = [];

    e.data.data.forEach((image) => {
      if (image.id) {
        tempImages.push(image);
      }
    });

    postMessage(tempImages);
  }
}