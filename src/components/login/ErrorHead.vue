<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineProps<{
    message: string
}>()
</script>
<template>
    <div class="errorHead">
        <Icon icon="carbon:warning-hex"></Icon>
        <span>{{message}}</span>
    </div>
</template>
<style lang="scss" scoped>
.errorHead {
    display: flex;
    align-items: center;
    color: var(--destructive-foreground);
}
</style>