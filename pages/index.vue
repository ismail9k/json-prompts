<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">JSON Prompts Gallery</h1>
      <p class="app-subtitle">ChatGPT Image Generation Prompts</p>
    </header>

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

    <div class="prompts-grid">
      <div 
        v-for="prompt in filteredPrompts" 
        :key="prompt.id"
        class="prompt-card"
        @click="selectPrompt(prompt)"
      >
        <div class="prompt-preview">
          <div class="preview-placeholder">
            <span class="preview-icon">🎨</span>
          </div>
        </div>
        <div class="prompt-info">
          <h3 class="prompt-title">{{ prompt.title }}</h3>
          <div class="prompt-tags">
            <span v-for="tag in prompt.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
          <button class="copy-btn" @click.stop="copyPrompt(prompt)">
            Copy JSON
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedPrompt" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ selectedPrompt.title }}</h2>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div class="modal-description" v-html="selectedPrompt.description"></div>
          <pre class="json-display">{{ JSON.stringify(selectedPrompt.promptData, null, 2) }}</pre>
          <button class="copy-btn-large" @click="copyPrompt(selectedPrompt)">
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
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

const filteredPrompts = computed(() => {
  return prompts.value.filter(prompt => {
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