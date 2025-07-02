<template>
  <article 
    class="prompt-card"
    :class="{ 'prompt-card--featured': isFeatured }"
    @click="$emit('select', prompt)"
  >
    <div class="card-glow" v-if="isFeatured"></div>
    <div class="prompt-preview">
      <div class="preview-placeholder">
        <span class="preview-icon">🎨</span>
      </div>
      <div class="difficulty-badge" :class="`difficulty-badge--${prompt.difficulty}`">
        {{ prompt.difficulty }}
      </div>
      <div class="featured-badge" v-if="isFeatured">
        ⭐ Featured
      </div>
    </div>
    <div class="prompt-info">
      <div class="prompt-header">
        <h3 class="prompt-title">{{ prompt.title }}</h3>
        <div class="prompt-category">{{ getCategoryTitle(prompt.category) }}</div>
      </div>
      <div class="prompt-tags">
        <span v-for="tag in prompt.tags?.slice(0, 3)" :key="tag" class="tag">
          {{ tag }}
        </span>
        <span v-if="prompt.tags?.length > 3" class="tag tag--more">
          +{{ prompt.tags.length - 3 }}
        </span>
      </div>
      <div class="card-actions">
        <button class="copy-btn" @click.stop="$emit('copy', prompt)">
          <span class="copy-icon">📋</span>
          Copy JSON
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  prompt: {
    type: Object,
    required: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select', 'copy'])

const getCategoryTitle = (categoryId) => {
  const categories = {
    gradient: 'Gradient',
    neon: 'Neon',
    crystal: 'Crystal'
  }
  return categories[categoryId] || categoryId
}
</script>

<style scoped>
.prompt-card {
  position: relative;
  background: var(--color-background-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0;
  cursor: pointer;
  transition: all var(--transition-medium) cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: var(--blur-backdrop);
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.prompt-card--featured {
  background: var(--color-background-featured);
  border-color: var(--color-border-featured);
  box-shadow: var(--shadow-featured);
  position: relative;
  z-index: var(--z-featured);
}

.card-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-card-border);
  border-radius: var(--radius-lg);
  z-index: -1;
  opacity: 0;
  transition: opacity var(--transition-medium);
}

.prompt-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-card-hover);
}

.prompt-card--featured:hover .card-glow {
  opacity: 1;
}

.prompt-preview {
  position: relative;
  height: 140px;
  background: var(--gradient-preview);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
  overflow: hidden;
}

.prompt-card--featured .prompt-preview {
  background: var(--gradient-featured-preview);
}

.preview-placeholder {
  font-size: var(--font-size-2xl);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.difficulty-badge {
  position: absolute;
  top: var(--spacing-sm);
  left: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
  text-transform: capitalize;
  backdrop-filter: var(--blur-backdrop);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.difficulty-badge--beginner {
  background: rgba(150, 206, 180, 0.2);
  color: var(--color-accent-4);
}

.difficulty-badge--intermediate {
  background: rgba(69, 183, 209, 0.2);
  color: var(--color-accent-3);
}

.difficulty-badge--advanced {
  background: rgba(255, 107, 107, 0.2);
  color: var(--color-accent-1);
}

.featured-badge {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(255, 215, 0, 0.2);
  color: #FFD700;
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 600;
  backdrop-filter: var(--blur-backdrop);
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.prompt-info {
  padding: var(--spacing-lg);
}

.prompt-header {
  margin-bottom: var(--spacing-md);
}

.prompt-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-primary);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.prompt-category {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.prompt-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-lg);
}

.tag {
  background: var(--color-surface);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  font-weight: 500;
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);
}

.tag--more {
  background: var(--color-primary);
  color: var(--color-text-primary);
  font-weight: 600;
}

.card-actions {
  display: flex;
  justify-content: center;
}

.copy-btn {
  background: var(--gradient-primary);
  color: var(--color-text-primary);
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  font-size: var(--font-size-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-inset);
}

.copy-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.copy-btn:active {
  transform: translateY(0);
}

.copy-icon {
  font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
  .prompt-card:hover {
    transform: translateY(-4px);
  }
  
  .prompt-preview {
    height: 120px;
  }
  
  .prompt-info {
    padding: var(--spacing-md);
  }
}
</style>