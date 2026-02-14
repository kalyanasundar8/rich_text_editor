import { Editor, Transforms } from "slate";
import { EmbedElement, EmbedType } from "../../core/EditorTypes";

interface InsertEmbedOptions {
  url: string;
  embedType: EmbedType;
}

const insertEmbed = (
  editor: Editor,
  { url, embedType }: InsertEmbedOptions,
) => {
  const embed: EmbedElement = {
    type: "embed",
    url,
    embedType,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, embed);
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
};

export default insertEmbed;
