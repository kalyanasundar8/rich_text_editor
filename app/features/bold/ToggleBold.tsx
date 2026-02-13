import { Editor } from "slate"

export const isBoldMarkActive = (editor: Editor) => {
    const mark = Editor.marks(editor);
    return mark ? mark.bold === true : false;
}

export const toggleBold = (editor: Editor) => {
    const isBoldActive = isBoldMarkActive(editor);

    if (isBoldActive) {
        Editor.removeMark(editor, "bold");
    } else {
        Editor.addMark(editor, "bold", true);
    }
}