import { Editor } from "slate";

export const isItalicActive = (editor: Editor) => {
    const mark = Editor.marks(editor);
    return mark ? mark.italic === true : false;
}

export const toggleItalic = (editor: Editor) => {
    const isItalic = isItalicActive(editor);

    if (isItalic) {
        Editor.removeMark(editor, "italic");
    } else {
        Editor.addMark(editor, "italic", true);
    }
}