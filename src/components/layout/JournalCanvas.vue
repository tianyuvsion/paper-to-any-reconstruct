<template>
  <div class="journal-canvas" aria-hidden="true">
    <div class="glow-orb orb-primary"></div>
    <div class="glow-orb orb-secondary"></div>
    <div class="grid-texture"></div>
  </div>
</template>

<style scoped>
.journal-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
}

.orb-primary {
  width: 480px;
  height: 480px;
  top: -120px;
  left: -80px;
  background: radial-gradient(circle, rgba(81, 57, 149, 0.22) 0%, rgba(240, 234, 251, 0) 70%);
}

.orb-secondary {
  width: 520px;
  height: 520px;
  bottom: -150px;
  right: -100px;
  background: radial-gradient(circle, rgba(22, 127, 122, 0.16) 0%, rgba(217, 241, 239, 0) 70%);
}

.grid-texture {
  position: absolute;
  inset: 0;
  opacity: 0.35;
  background-image:
    linear-gradient(to right, rgba(67, 54, 93, 0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(67, 54, 93, 0.04) 1px, transparent 1px);
  background-size: 32px 32px;
}
</style>
