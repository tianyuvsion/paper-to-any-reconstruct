<template>
  <div class="wb-layout" :class="{ 'no-rail': !workbenchStore.isRailOpen, 'no-dock': !workbenchStore.isDockOpen }">
    <!-- 左侧资料栏 -->
    <aside v-show="workbenchStore.isRailOpen" class="layout-rail">
      <slot name="rail" />
    </aside>

    <!-- 中间主研读舞台 -->
    <main class="layout-stage">
      <slot name="stage" />
    </main>

    <!-- 右侧原文依据栏 -->
    <aside v-show="workbenchStore.isDockOpen" class="layout-dock">
      <slot name="dock" />
    </aside>
  </div>
</template>

<script setup lang="ts">
import { useWorkbenchStore } from '@/stores/workbench'

const workbenchStore = useWorkbenchStore()
</script>

<style scoped>
.wb-layout {
  display: grid;
  grid-template-columns: 260px 1fr 480px;
  height: calc(100vh - 64px);
  width: 100%;
  overflow: hidden;
  background: #f8f6fb;
  transition: grid-template-columns 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.wb-layout.no-rail {
  grid-template-columns: 0px 1fr 480px;
}

.wb-layout.no-dock {
  grid-template-columns: 260px 1fr 0px;
}

.wb-layout.no-rail.no-dock {
  grid-template-columns: 0px 1fr 0px;
}

.layout-rail {
  background: #ffffff;
  border-right: 1px solid #ebe8ef;
  overflow: hidden;
  width: 260px;
  min-width: 260px;
}

.layout-stage {
  background: #ffffff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.layout-dock {
  background: #faf9fc;
  border-left: 1px solid #e1dee7;
  overflow-y: auto;
  min-width: 480px;
}

@media (max-width: 1200px) {
  .wb-layout {
    grid-template-columns: 240px 1fr 400px;
  }
}

@media (max-width: 992px) {
  .wb-layout {
    grid-template-columns: 1fr;
  }
  .layout-rail, .layout-dock {
    display: none;
  }
}
</style>
