import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type HeadingType =
  | "heading-one"
  | "heading-two"
  | "heading-three"
  | "heading-four"
  | "heading-five"
  | "heading-six";

export type HeadingElement = {
  type: HeadingType;

  children: CustomText[];
};

export type ImageElement = {
  type: "image";
  url: string;
  children: [{ text: "" }];
};

export type ImageUploadElement = {
  type: "image-upload";
  children: [{ text: "" }];
};

export type LinkElement = {
  type: "link";
  url: string;
  children: CustomText[];
};

export type EmbedType = "youtube" | "vimeo" | "twitter";

export type EmbedElement = {
  type: "embed";
  url: string;
  embedType: EmbedType;
  children: [{ text: "" }];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | ImageElement
  | ImageUploadElement
  | LinkElement
  | EmbedElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
