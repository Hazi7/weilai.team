<script setup lang="ts">
import HotTable from "@handsontable/vue3";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/vue-3";
import { onBeforeUnmount, onMounted, ref } from "vue";
import type Handsontable from "handsontable";
import "handsontable/dist/handsontable.full.css";
import { HyperFormula } from "hyperformula";
import { registerAllModules } from "handsontable/registry";

defineProps<NodeViewProps>();
registerAllModules();

const tableRef = ref<Handsontable | null>(null);
const data = null;
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

onMounted(() => {
  if (!tableRef.value) return;
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
    <HotTable ref="tableRef" :data="data" :settings="hotSettings"></HotTable>
  </NodeViewWrapper>
</template>

<style lang="scss" scoped></style>
