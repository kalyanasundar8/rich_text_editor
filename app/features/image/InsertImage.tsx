import { Editor, Transforms } from "slate";

export const insertImage = (editor: Editor, url: string) => {
    const image = {
        type: "image",
        url,
        children: [{ text: "" }],
    }

    Transforms.insertNodes(editor, image);
}