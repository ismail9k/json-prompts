<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo-section">
        <div class="logo-icon">🎨</div>
        <div class="logo-text">
          <h1 class="app-title">JSON Prompts Gallery</h1>
          <p class="app-subtitle">ChatGPT Image Generation Prompts</p>
        </div>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <span class="stat-number">{{ totalPrompts }}</span>
          <span class="stat-label">Prompts</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ totalCategories }}</span>
          <span class="stat-label">Categories</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  totalPrompts: {
    type: Number,
    default: 0
  },
  totalCategories: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.app-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  padding: var(--spacing-xl) var(--spacing-md);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-xl);
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex: 1;
}

.logo-icon {
  font-size: 4rem;
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.3));
  animation: float 6s ease-in-out infinite;
}

.logo-text {
  text-align: left;
}

.app-title {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  background: var(--gradient-text);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient 8s ease infinite;
  margin-bottom: var(--spacing-xs);
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.app-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--font-size-lg);
  font-weight: 400;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: var(--spacing-xl);
  align-items: center;
}

.stat-item {
  text-align: center;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  backdrop-filter: var(--blur-backdrop);
  min-width: 80px;
}

.stat-number {
  display: block;
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-lg);
  }
  
  .logo-section {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .logo-text {
    text-align: center;
  }
  
  .app-title {
    font-size: var(--font-size-2xl);
  }
  
  .header-stats {
    gap: var(--spacing-lg);
  }
  
  .stat-item {
    padding: var(--spacing-sm) var(--spacing-md);
    min-width: 60px;
  }
}
</style>