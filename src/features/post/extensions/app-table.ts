import { mergeAttributes, Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import AppTable from "../components/editor-extension-views/AppTable.vue";

const AppTableExtension = Node.create({
  name: "appTable",

  group: "block",

  atom: true,

  parseHTML() {
    return [
      {
        tag: "app-table",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["app-table", mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return VueNodeViewRenderer(AppTable);
  },
});

export default AppTableExtension;
