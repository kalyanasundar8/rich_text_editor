import { Editor, Transforms, Range, Element as SlateElement } from "slate";
import { LinkElement, EmbedElement } from "../../core/EditorTypes";
import { isEmbeddableUrl, parseEmbedUrl } from "../embed/EmbedUtils";

// URL regex pattern
const URL_REGEX = /https?:\/\/[^\s<>"{}|\\^`[\]]+/g;

/**
 * Check if text contains a URL
 */
export const isUrl = (text: string): boolean => {
  URL_REGEX.lastIndex = 0;
  return URL_REGEX.test(text);
};

/**
 * Extract all URLs from text
 */
export const extractUrls = (text: string): string[] => {
  URL_REGEX.lastIndex = 0;
  return text.match(URL_REGEX) || [];
};

/**
 * Insert a link at the current selection
 */
export const insertLink = (editor: Editor, url: string, text?: string) => {
  if (editor.selection) {
    wrapLink(editor, url, text);
  }
};

/**
 * Wrap the current selection in a link, or insert a new link
 */
export const wrapLink = (editor: Editor, url: string, text?: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const link: LinkElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: text || url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

/**
 * Check if a link is active at the current selection
 */
export const isLinkActive = (editor: Editor): boolean => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

/**
 * Remove link from the current selection
 */
export const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

/**
 * Insert an embed element
 */
export const insertEmbed = (editor: Editor, url: string) => {
  const embedInfo = parseEmbedUrl(url);
  if (!embedInfo) return false;

  const embed: EmbedElement = {
    type: "embed",
    url: embedInfo.embedUrl,
    embedType: embedInfo.type,
    children: [{ text: "" }],
  };

  Transforms.insertNodes(editor, embed);
  // Insert a new paragraph after the embed
  Transforms.insertNodes(editor, {
    type: "paragraph",
    children: [{ text: "" }],
  });
  return true;
};

/**
 * Handle paste event - detect URLs and convert to links or embeds
 */
export const withLinks = (editor: Editor): Editor => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      // Check if it's an embeddable URL first
      if (isEmbeddableUrl(text)) {
        insertEmbed(editor, text);
      } else {
        wrapLink(editor, text);
      }
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text) {
      const urls = extractUrls(text);

      if (urls.length > 0 && text.trim() === urls[0]) {
        const url = text.trim();
        // Check if it's an embeddable URL first
        if (isEmbeddableUrl(url)) {
          insertEmbed(editor, url);
          return;
        }
        // Otherwise insert as link
        wrapLink(editor, url);
        return;
      }
    }

    insertData(data);
  };

  return editor;
};

export default withLinks;
