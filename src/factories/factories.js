import { fabric } from 'fabric';

export const textBoxFactory = async (options) => {
 return new fabric.Textbox(options.text ?? '', options)
};

export const imageFactory = (imageObject, options) => (
    new Promise((resolve, reject) => {
        console.log(        new fabric.Image(imageObject
          ? resolve(URL.createObjectURL(imageObject))
          : reject(URL.createObjectURL(imageObject)), options));
        new fabric.Image(imageObject
            ? resolve(URL.createObjectURL(imageObject))
            : reject(URL.createObjectURL(imageObject)), options);
    })
);

