<template>
  <section class="featured-section">
    <div class="section-header">
      <h2 class="section-title">Featured Prompts</h2>
      <p class="section-subtitle">Hand-picked prompts for stunning results</p>
    </div>
    
    <div class="featured-grid">
      <PromptCard
        v-for="prompt in featuredPrompts"
        :key="prompt.id"
        :prompt="prompt"
        :is-featured="true"
        @select="$emit('select', prompt)"
        @copy="$emit('copy', prompt)"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  featuredPrompts: {
    type: Array,
    default: () => []
  }
})

defineEmits(['select', 'copy'])
</script>

<style scoped>
.featured-section {
  margin-bottom: var(--spacing-2xl);
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  background: var(--gradient-text);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient 6s ease infinite;
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.02em;
}

.section-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  font-weight: 400;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@media (max-width: 768px) {
  .featured-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>