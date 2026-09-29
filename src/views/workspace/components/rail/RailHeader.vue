<template>
  <div class="rail-header">
    <div class="rail-header-top">
      <div class="rail-brand">
        <span class="brand-badge">R²</span>
        <span class="brand-title">研读工作空间</span>
      </div>
    </div>

    <!-- 新建研究 / 导入论文主按钮 -->
    <button
      type="button"
      class="new-research-btn carved-pressable"
      @click="$emit('import')"
    >
      <span class="btn-icon">＋</span>
      <span>导入新论文</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'import'): void
}>()
</script>

<style scoped>
.rail-header {
  padding: 16px 14px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid #ebe5f2;
}

.rail-header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rail-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-badge {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  background: #35206d;
  color: #ffffff;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 800;
  font-family: var(--font-serif);
}

.brand-title {
  font-size: 13px;
  font-weight: 700;
  color: #18141f;
  letter-spacing: -0.3px;
}

.new-research-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 14px;
  border: 1px dashed #cbbddf;
  border-radius: 10px;
  background: #fbf9fd;
  color: #513995;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}

.new-research-btn:hover {
  background: #f3ecfb;
  border-color: #9c84bf;
  border-style: solid;
}

.btn-icon {
  font-size: 16px;
  line-height: 1;
}
</style>
