export const findLocalImage = async (images: any[], name: string) => {
  if (images && images.length > 0) {
    return new Promise((resolve, reject) => {
      try {
        const localImage = images.find((imageEntry) => { return imageEntry.name === name });

        resolve(localImage);
      }
      catch (err) {
        reject(err);
      }
    })
  }
}

export const doAI = async (canvasImage) => {
  const splitData = canvasImage.split(',')[1];

  const bytes = self.atob(splitData);
  const buf = new ArrayBuffer(bytes.length);
  let byteArr = new Uint8Array(buf);

  for (var i = 0; i < bytes.length; i++) {
    byteArr[i] = bytes.charCodeAt(i);
  }

  let data = null;

  try {
    const response = await fetch(`https://westus2.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Tags,Color,Description`, {
      headers: {
        "Ocp-Apim-Subscription-Key": "d930861b5bba49e5939b843f9c4e5846",
        "Content-Type": "application/octet-stream"
      },
      method: "POST",
      body: byteArr
    });
    data = await response.json();

    return data;

  } catch (error) {
    console.error(error);
    return error;
  }
}

export const getInkInfo = async (points: any[]) => {
  const inkObject = {
    "language": "en-US",
    "unit": "mm",
    "version": 1,
    "strokes": [
      {
        "id": Math.floor(Math.random() * Math.floor(100)),
        "points": points
      },
    ]
  };
  console.log(inkObject);

  const response = await fetch(`https://api.cognitive.microsoft.com/inkrecognizer/v1.0-preview/recognize`, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "4f0fef79672c4c7e90d92d282cc24ded"
    },
    method: "PUT",
    body: JSON.stringify(inkObject)
  });
  
  const data = await response.json();
  return data;
}

/*
const inkObject = {
    "language": "en-US",
    "unit": "mm",
    "version": 1,
    "strokes": [
      {
        "id": Math.floor(Math.random() * Math.floor(100)),
        "points": points
      },
    ]
  };
  console.log(inkObject);

  const response = await fetch(`https://api.cognitive.microsoft.com/inkrecognizer/v1.0-preview/recognize`, {
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": "4f0fef79672c4c7e90d92d282cc24ded"
    },
    method: "PUT",
    body: JSON.stringify(inkObject)
  });
  
  const data = await response.json();
  return data;
*/