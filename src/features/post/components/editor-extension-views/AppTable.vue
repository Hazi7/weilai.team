<script setup lang="ts">
import { HotTable } from "@handsontable/vue3";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/vue-3";
import { onBeforeUnmount, onMounted, ref } from "vue";
import "handsontable/dist/handsontable.full.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";
import type Handsontable from "handsontable";

const props = defineProps<NodeViewProps>();
registerAllModules();

const tableRef = ref<unknown | null>(null);

const hotSettings = {
  startRows: 5,
  startCols: 5,
  width: "100%",
  height: "auto",
  autoWrapRow: true,
  autoWrapCol: true,
  formulas: {
    engine: HyperFormula,
  },
  colHeaders: true,
  rowHeaders: true,
  licenseKey: "non-commercial-and-evaluation",
};

console.log(hotSettings);

onMounted(() => {
  let tableInstance = tableRef.value?.hotInstance as Handsontable.Core;

  tableInstance.addHook("afterChange", () => {
    console.log(tableInstance.getSourceData());
  });
});

onBeforeUnmount(() => {
  if (tableRef.value) {
    tableRef.value.destroy();
    tableRef.value = null;
  }
});
</script>

<template>
  <NodeViewWrapper class="app-table">
    <HotTable
      ref="tableRef"
      :data="props.node.attrs.tableData"
      :settings="hotSettings"
    ></HotTable>
  </NodeViewWrapper>
</template>

<style lang="scss" scoped></style>
