import { fabric } from 'fabric';

export const textBoxFactory = async (options) => {
 return new fabric.Textbox(options.text ?? '', options)
};

export const figureFactory = async (options) => {
  return new fabric.Rect(options)
};

export const imageFactory = ({imageObject, ...options}) => (
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const imgObj = new Image();
      imgObj.src = event.target.result;
      imgObj.onload = () => {

        const image = new fabric.Image(imgObj);
        image.set(options);

        resolve(image);
        reject(image);
      }
    };
    reader.readAsDataURL(imageObject);
  })
);


