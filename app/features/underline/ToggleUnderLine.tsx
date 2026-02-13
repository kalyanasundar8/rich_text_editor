import { Editor } from "slate";

export const isUnderlineActive = (editor: Editor) => {
    const mark = Editor.marks(editor);
    return mark ? mark.underline === true : false;
}

export const toggleUnderline = (editor: Editor) => {
    const isUnderline = isUnderlineActive(editor);

    if (isUnderline) {
        Editor.removeMark(editor, "underline");
    } else {
        Editor.addMark(editor, "underline", true);
    }
}