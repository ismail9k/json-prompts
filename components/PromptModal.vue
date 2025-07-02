<template>
  <div v-if="prompt" class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ prompt.title }}</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <div class="modal-body">
        <div class="modal-description" v-html="prompt.description"></div>
        <pre class="json-display">{{ JSON.stringify(prompt.promptData, null, 2) }}</pre>
        <button class="copy-btn-large" @click="$emit('copy', prompt)">
          Copy to Clipboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  prompt: {
    type: Object,
    default: null
  }
})

defineEmits(['close', 'copy'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  backdrop-filter: var(--blur-glass);
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  background: var(--color-background-modal);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  margin: var(--spacing-xl);
  box-shadow: var(--shadow-modal);
  backdrop-filter: var(--blur-glass);
  animation: slideIn 0.3s ease-out;
  position: relative;
}

.modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--gradient-card-border);
  border-radius: var(--radius-lg);
  z-index: -1;
  margin: -1px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.modal-header h2 {
  color: var(--color-text-primary);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text-primary);
  font-size: var(--font-size-2xl);
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.modal-description {
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
}

.json-display {
  background: var(--color-code-bg);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: var(--spacing-md) 0;
  font-family: 'Courier New', monospace;
  color: var(--color-text-primary);
}

.copy-btn-large {
  background: var(--gradient-primary);
  color: var(--color-text-primary);
  border: none;
  padding: calc(var(--spacing-md) * 0.75) var(--spacing-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: var(--font-size-base);
  transition: opacity var(--transition-fast);
}

.copy-btn-large:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.copy-btn-large:active {
  transform: translateY(0);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 768px) {
  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
    margin: var(--spacing-md);
    padding: var(--spacing-lg);
  }
}
</style>