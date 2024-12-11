import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

export const AppCodeBlock = CodeBlockLowlight.extend({
  renderHTML({ HTMLAttributes, node }) {
    console.log(node.attrs);

    const codeContent = node.textContent;
    const lines = codeContent.split("\n");

    // 生成行号
    const lineNumbers = lines.map((_, index) => index + 1).join("\n");

    return [
      "div",
      { class: "code-block" }, // 添加 wrapper div
      [
        "pre",
        { class: "code-block__pre" },
        ["code", { class: "code-block__code" }, 0],
      ],
      ["span", { class: "code-block__lang" }, node.attrs.language],
      ["button", { class: "code-block__copy" }],
      // 在这里渲染行号
      [
        "div",
        { class: "code-block__line" },
        ["span", { class: "code-block__line-numbers" }, lineNumbers],
      ],
    ];
  },

  onUpdate(this) {
    const codeContent = this.editor.getHTML();
    const lines = codeContent.split("\n");

    const lineNumbers = lines.map((_, index) => index + 1).join("\n");

    const lineNumbersElement = document.querySelector(
      ".code-block__line-numbers",
    );
    if (lineNumbersElement) {
      lineNumbersElement.textContent = lineNumbers;
    }
  },
});
