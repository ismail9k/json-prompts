<template>
  <div class="filter-section">
    <input 
      v-model="searchTerm" 
      type="text" 
      placeholder="Search prompts..." 
      class="search-input"
    >
    <select v-model="selectedCategory" class="category-filter">
      <option value="">All Categories</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.title }}
      </option>
    </select>
  </div>
</template>

<script setup>
const searchTerm = defineModel('searchTerm')
const selectedCategory = defineModel('selectedCategory')

defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.filter-section {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  margin-bottom: var(--spacing-2xl);
  padding: 0 var(--spacing-md);
}

.search-input,
.category-filter {
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  color: var(--color-text-primary);
  backdrop-filter: var(--blur-backdrop);
  font-size: var(--font-size-base);
  font-weight: 500;
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-inset);
  min-width: 180px;
}

.search-input {
  min-width: 240px;
}

.search-input:focus,
.category-filter:focus {
  outline: none;
  border-color: var(--color-primary);
  background: var(--color-surface-hover);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: var(--color-text-placeholder);
  font-weight: 400;
}

.category-filter option {
  background: var(--color-background-modal);
  color: var(--color-text-primary);
  padding: var(--spacing-sm);
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  .search-input,
  .category-filter {
    width: 100%;
    max-width: 300px;
    min-width: auto;
  }
}
</style>