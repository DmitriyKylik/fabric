import { fabric } from 'fabric';

export const textBoxFactory = async (options) => new fabric.Textbox(options.text ?? '', options);

