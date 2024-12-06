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
        getAttrs: (element) => {
          return {
            tableData: JSON.parse(element.getAttribute("table-data") || "[]"),
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "app-table",
      mergeAttributes(HTMLAttributes, {
        "table-data": JSON.stringify(HTMLAttributes.tableData),
      }),
    ];
  },

  addAttributes() {
    return {
      tableData: {
        default: [
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
          [null, null, null, null, null],
        ],
      },
    };
  },

  addNodeView() {
    return VueNodeViewRenderer(AppTable);
  },
});

export default AppTableExtension;
