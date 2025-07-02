<template>
  <div class="app-container">
    <AppHeader 
      :total-prompts="prompts.length"
      :total-categories="categories.length"
    />
    
    <FeaturedPrompts
      v-if="featuredPrompts.length > 0"
      :featured-prompts="featuredPrompts"
      @select="selectPrompt"
      @copy="copyPrompt"
    />

    <FilterSection 
      v-model:search-term="searchTerm"
      v-model:selected-category="selectedCategory"
      :categories="categories"
    />

    <section class="all-prompts-section">
      <div class="section-header">
        <h2 class="section-title">All Prompts</h2>
      </div>
      <div class="prompts-grid">
        <PromptCard
          v-for="prompt in filteredPrompts"
          :key="prompt.id"
          :prompt="prompt"
          @select="selectPrompt"
          @copy="copyPrompt"
        />
      </div>
    </section>

    <PromptModal
      :prompt="selectedPrompt"
      @close="closeModal"
      @copy="copyPrompt"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const prompts = ref([])
const searchTerm = ref('')
const selectedCategory = ref('')
const selectedPrompt = ref(null)
const indexData = ref(null)

const categories = computed(() => {
  return indexData.value?.categories || []
})

const featuredPrompts = computed(() => {
  return prompts.value.filter(prompt => prompt.featured === true)
})

const regularPrompts = computed(() => {
  return prompts.value.filter(prompt => !prompt.featured)
})

const filteredPrompts = computed(() => {
  const promptsToFilter = regularPrompts.value
  return promptsToFilter.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         prompt.tags?.some(tag => tag.toLowerCase().includes(searchTerm.value.toLowerCase()))
    
    const matchesCategory = !selectedCategory.value || prompt.category === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })
})

const loadPrompts = async () => {
  try {
    const indexResponse = await fetch('/data/prompts/_index.json')
    indexData.value = await indexResponse.json()
    
    for (const promptInfo of indexData.value.prompts) {
      const [metaResponse, promptResponse, descResponse] = await Promise.all([
        fetch(`/data/prompts/${promptInfo.id}/meta.json`),
        fetch(`/data/prompts/${promptInfo.id}/prompt.json`),
        fetch(`/data/prompts/${promptInfo.id}/description.md`)
      ])
      
      const meta = await metaResponse.json()
      const promptData = await promptResponse.json()
      const description = await descResponse.text()
      
      prompts.value.push({
        ...meta,
        promptData,
        description,
        previewUrl: `/data/prompts/${promptInfo.id}/preview.png`
      })
    }
  } catch (error) {
    console.error('Error loading prompts:', error)
  }
}

const selectPrompt = (prompt) => {
  selectedPrompt.value = prompt
}

const closeModal = () => {
  selectedPrompt.value = null
}

const copyPrompt = async (prompt) => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(prompt.promptData, null, 2))
    alert('Prompt copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
  }
}

onMounted(() => {
  loadPrompts()
})
</script>

<style scoped>
@import '@/assets/css/variables.css';

.app-container {
  min-height: 100vh;
  background: var(--gradient-background);
  color: var(--color-text-primary);
  padding: var(--spacing-xl);
}

.all-prompts-section {
  margin-top: var(--spacing-2xl);
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.01em;
}

.prompts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (max-width: 768px) {
  .prompts-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
}
</style>