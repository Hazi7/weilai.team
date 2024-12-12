import Confirm from "@/components/confirm/Confirm.vue";
import { createApp } from "vue";
export function showConfirm({
  title = "",
  content = "",

  description = "",
  confirmBtnTxt = "确定",
  cancelBtnTxt = "取消",
}) {
  return new Promise((resolve, reject) => {
    const app = createApp(Confirm, {
      title,
      content,
      description,
      confirmBtnTxt,
      cancelBtnTxt,
      onConfirm: () => {
        unmount();
        resolve(true);
      },
      onCancel: () => {
        unmount();
        reject(false);
      },
    });

    // 创建一个挂载容器
    const parentNode = document.createElement("div");
    document.body.appendChild(parentNode);

    // 卸载组件
    const unmount = () => {
      app.unmount();
      document.body.removeChild(parentNode);
    };

    // 挂载组件
    app.mount(parentNode);
  });
}
