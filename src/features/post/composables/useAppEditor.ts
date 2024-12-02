import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Bold from "@tiptap/extension-bold";
import AppTableExtension from "@post/extensions/app-table";
import Image from "@tiptap/extension-image";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Strike from "@tiptap/extension-strike";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/vue-3";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Paragraph from "@tiptap/extension-paragraph";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";

export default function useAppEditor() {
  const editor = useEditor({
    content: {},
    extensions: [
      Document,
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Paragraph,
      Text,
      Blockquote,
      CodeBlock,
      Heading.configure({
        levels: [1, 2, 3, 4, 5],
      }),
      HorizontalRule,
      Bold,
      Image.configure({
        allowBase64: true,
      }),
      AppTableExtension,
      ListItem,
      BulletList,
      OrderedList,
      Color,
      TextStyle,
      Strike,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
  });

  return {
    editor,
  };
}
