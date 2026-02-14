import { Editor, Transforms } from "slate";
import { ImageUploadElement } from "../../core/EditorTypes";

const insertImageUpload = (editor: Editor) => {
  const imageUpload: ImageUploadElement = {
    type: "image-upload",
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, imageUpload);
};

export default insertImageUpload;
