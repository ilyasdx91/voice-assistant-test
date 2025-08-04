<template>
  <div class="settings-drawer" :class="{ 'drawer-open': isOpen }">
    <!-- Overlay -->
    <div class="drawer-overlay" @click="closeDrawer" v-show="isOpen"></div>
    
    <!-- Drawer Panel -->
    <div class="drawer-panel">
      <div class="drawer-header">
        <h3>Настройки голосового помощника</h3>
        <button class="btn close-btn" @click="closeDrawer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      
      <div class="drawer-content">
        <!-- Язык распознавания -->
        <div class="setting-group">
          <label>Язык распознавания:</label>
          <select v-model="recognitionLanguage" class="language-select">
            <option value="auto">Автоопределение</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
            <option value="uz">O'zbekcha</option>
          </select>
        </div>

        <!-- Голосовой ответ -->
        <div class="setting-group">
          <label class="checkbox-label">
            <input 
              type="checkbox" 
              v-model="voiceResponse" 
              class="voice-checkbox"
            >
            <span class="checkmark">🔊</span>
            Голосовой ответ (OpenAI TTS)
          </label>
          <button 
            @click="testTTS" 
            class="test-tts-btn"
            :disabled="!voiceResponse || !apiKey"
          >
            🔊 Тест голоса
          </button>
        </div>

        <!-- TTS Настройки -->
        <div v-if="voiceResponse" class="tts-settings">
          <div class="setting-group">
            <label>Голос:</label>
            <select v-model="ttsVoice" class="language-select">
              <option value="alloy">Alloy (нейтральный)</option>
              <option value="echo">Echo (мужской)</option>
              <option value="fable">Fable (британский)</option>
              <option value="onyx">Onyx (глубокий мужской)</option>
              <option value="nova">Nova (женский)</option>
              <option value="shimmer">Shimmer (мягкий женский)</option>
            </select>
          </div>

          <div class="setting-group">
            <label>Скорость: {{ ttsSpeed }}x</label>
            <input 
              type="range" 
              v-model="ttsSpeed" 
              min="0.25" 
              max="4.0" 
              step="0.25"
              class="speed-slider"
            >
            <div class="speed-labels">
              <span>0.25x</span>
              <span>1x</span>
              <span>4x</span>
            </div>
          </div>
        </div>

        <!-- API Настройки -->
        <div class="api-settings">
          <div class="setting-group">
            <label>OpenAI API ключ:</label>
            <input 
              type="password" 
              v-model="apiKey" 
              placeholder="Введите OpenAI API ключ"
              class="api-input"
            >
            <div v-if="apiKey" class="api-status">
              ✅ API ключ установлен
            </div>
          </div>
          
          <div class="setting-group">
            <label>URL бэкенд API:</label>
            <input 
              type="text" 
              v-model="backendUrl" 
              placeholder="https://example.com/api"
              class="api-input"
            >
          </div>
        </div>
        
        <div class="rate-limit-info">
          ℹ️ Голос → Текст → Отправка на ваш бэкенд API
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  recognitionLanguage: String,
  voiceResponse: Boolean,
  ttsVoice: String,
  ttsSpeed: Number,
  apiKey: String,
  backendUrl: String
})

const emit = defineEmits([
  'close',
  'update:recognitionLanguage',
  'update:voiceResponse', 
  'update:ttsVoice',
  'update:ttsSpeed',
  'update:apiKey',
  'update:backendUrl',
  'testTTS'
])

// Computed для v-model
const recognitionLanguage = computed({
  get: () => props.recognitionLanguage,
  set: (value) => emit('update:recognitionLanguage', value)
})

const voiceResponse = computed({
  get: () => props.voiceResponse,
  set: (value) => emit('update:voiceResponse', value)
})

const ttsVoice = computed({
  get: () => props.ttsVoice,
  set: (value) => emit('update:ttsVoice', value)
})

const ttsSpeed = computed({
  get: () => props.ttsSpeed,
  set: (value) => emit('update:ttsSpeed', value)
})

const apiKey = computed({
  get: () => props.apiKey,
  set: (value) => emit('update:apiKey', value)
})

const backendUrl = computed({
  get: () => props.backendUrl,
  set: (value) => emit('update:backendUrl', value)
})

const closeDrawer = () => {
  emit('close')
}

const testTTS = () => {
  emit('testTTS')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.settings-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
  
  &.drawer-open {
    pointer-events: all;
  }
}

.drawer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(black, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  .drawer-open & {
    opacity: 1;
  }
}

.drawer-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background: white;
  box-shadow: -4px 0 20px rgba(black, 0.15);
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  flex-direction: column;
  
  .drawer-open & {
    transform: translateX(0);
  }
  
  @media (max-width: 480px) {
    width: 100%;
  }
}

.drawer-header {
  @include flex-between;
  padding: $space-lg;
  border-bottom: 1px solid rgba($color-border, 0.3);
  background: $gradient-primary;
  color: white;
  
  h3 {
    margin: 0;
    @include font-semibold;
    font-size: 1.1rem;
  }
  
  .close-btn {
    color: white;
    width: 32px;
    height: 32px;
    @include flex-center;
    border-radius: $radius-md;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(white, 0.2);
    }
  }
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: $space-lg;
}

.setting-group {
  margin-bottom: $space-lg;
  
  label {
    display: block;
    margin-bottom: $space-xs;
    @include font-semibold;
    color: $color-text-dark;
    font-size: 14px;
  }
}

.checkbox-label {
  @include flex-start;
  cursor: pointer;
  @include font-semibold;
  gap: $space-sm;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin: 0;
    cursor: pointer;
  }
  
  .checkmark {
    font-size: 16px;
  }
}

.api-input,
.language-select {
  width: 100%;
  padding: $space-sm $space-md;
  border: 2px solid rgba($color-primary-light, 0.3);
  border-radius: $radius-md;
  font-size: 14px;
  color: $color-text-dark;
  background: white;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
  }
}

.test-tts-btn {
  margin-top: $space-sm;
  padding: $space-xs $space-md;
  background: $gradient-success;
  color: white;
  border: none;
  border-radius: $radius-lg;
  cursor: pointer;
  font-size: 12px;
  @include font-medium;
  transition: all 0.3s ease;
  @include shadow-sm;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    @include shadow-md;
  }
  
  &:disabled {
    background: $color-disabled;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}

.tts-settings {
  margin-top: $space-md;
  padding: $space-lg;
  background: rgba($color-primary-light, 0.05);
  border-radius: $radius-lg;
  border: 1px solid rgba($color-primary, 0.2);
}

.speed-slider {
  width: 100%;
  margin: $space-sm 0;
  height: 6px;
  border-radius: $radius-sm;
  background: rgba($color-primary-light, 0.3);
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    border-radius: $radius-full;
    background: $color-primary;
    cursor: pointer;
    @include shadow-sm;
  }
  
  &::-moz-range-thumb {
    width: 18px;
    height: 18px;
    border-radius: $radius-full;
    background: $color-primary;
    cursor: pointer;
    border: none;
    @include shadow-sm;
  }
}

.speed-labels {
  @include flex-between;
  font-size: 12px;
  color: $color-text-muted;
  margin-top: $space-xs;
}

.api-status {
  margin-top: $space-xs;
  padding: $space-xs $space-sm;
  background: rgba($color-success, 0.1);
  border: 1px solid $color-success;
  border-radius: $radius-sm;
  font-size: 12px;
  color: darken($color-success, 20%);
  @include font-medium;
}

.api-settings {
  margin-top: $space-md;
  padding-top: $space-md;
  border-top: 1px solid rgba($color-border, 0.3);
}

.rate-limit-info {
  margin-top: $space-lg;
  padding: $space-md;
  background: $gradient-warning;
  border: 1px solid $color-warning;
  border-radius: $radius-md;
  color: #b8860b;
  font-size: 13px;
  @include font-medium;
  text-align: center;
}
</style>