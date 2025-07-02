# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application that serves as a gallery for ChatGPT image generation prompts. The app displays structured JSON prompts for AI image generation with categories, filtering, and modal views.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Generate static site
pnpm generate
```

## Architecture

### Data Structure
- **Prompts Storage**: Located in `/data/prompts/` with each prompt having its own folder
- **Index File**: `/data/prompts/_index.json` contains metadata for all prompts, categories, and featured prompts
- **Prompt Structure**: Each prompt folder contains:
  - `meta.json` - Metadata (title, category, tags, difficulty)
  - `prompt.json` - The actual prompt data structure
  - `description.md` - Detailed description
  - `preview.png` - Visual preview image

### Frontend Components
- **Single Page App**: Main interface in `/pages/index.vue`
- **Dynamic Loading**: Prompts are fetched from static JSON files at runtime
- **Modal System**: Click-to-view detailed prompt information
- **Search & Filter**: Real-time filtering by search term and category

### Key Features
- Category-based organization (gradient, neon, crystal, etc.)
- Difficulty levels (beginner, intermediate, advanced)
- JSON prompt copying to clipboard
- Responsive grid layout
- Featured prompts system

## Adding New Prompts

1. Create folder in `/data/prompts/` with prompt ID as name
2. Add the four required files (meta.json, prompt.json, description.md, preview.png)
3. Update `/data/prompts/_index.json` to include the new prompt
4. Follow existing JSON structure patterns for consistency

## Technology Stack

- **Framework**: Nuxt 3 with Vue 3
- **Styling**: CSS with custom properties
- **Package Manager**: pnpm
- **Static Assets**: Served from `/public/` and `/data/`