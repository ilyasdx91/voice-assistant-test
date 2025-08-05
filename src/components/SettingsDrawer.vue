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
            <span class="label-text">Голосовой ответ (OpenAI TTS)</span>
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
              min="0.5" 
              max="3.0" 
              step="0.5"
              class="speed-slider"
            >
            <div class="speed-labels">
              <span>0.5x</span>
              <span>1x</span>
              <span>1.5x</span>
              <span>2x</span>
              <span>2.5x</span>
              <span>3x</span>
            </div>
          </div>
        </div>

        <!-- API Настройки -->
        <div class="api-settings">
          <div class="setting-group">
            <label>OpenAI API ключ:</label>
            <div v-if="apiKey" class="api-status">
              ✅ API ключ установлен из переменной окружения
            </div>
            <div v-else class="api-warning">
              ⚠️ API ключ не установлен. Добавьте VITE_OPENAI_API_KEY в .env файл
            </div>
            <input 
              type="password" 
              v-model="apiKey" 
              placeholder="Или введите API ключ здесь (временно)"
              class="api-input"
              :class="{ 'api-input-optional': !!apiKey }"
            >
          </div>
          
          <div class="setting-group">
            <label>URL бэкенд API:</label>
            <div v-if="backendUrl && backendUrl.includes('VITE_BACKEND_API_URL')" class="api-status">
              ✅ Бэкенд URL установлен из переменной окружения
            </div>
            <div v-else-if="backendUrl" class="api-status">
              ✅ URL бэкенда: {{ backendUrl.substring(0, 50) }}...
            </div>
            <div v-else class="api-warning">
              ⚠️ URL бэкенда не установлен
            </div>
            <input 
              type="text" 
              v-model="backendUrl" 
              placeholder="Или введите URL бэкенда здесь"
              class="api-input"
              :class="{ 'api-input-optional': !!backendUrl }"
            >
          </div>
        </div>
        
<!--        <div class="rate-limit-info">-->
<!--          ℹ️ Голос → Текст → Отправка на ваш бэкенд API-->
<!--        </div>-->
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
  background: $gradient-main;
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
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  @include font-semibold;
  gap: $space-xs;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin: 0;
    cursor: pointer;
  }
  
  .checkmark {
    font-size: 14px;
    line-height: 1;
  }
  
  .label-text {
    white-space: nowrap;
  }
}

.api-input {
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

.language-select {
  width: 100%;
  padding: $space-sm $space-md;
  padding-right: 40px;
  border: 2px solid rgba($color-primary-light, 0.3);
  border-radius: $radius-md;
  font-size: 14px;
  color: $color-text-dark;
  background: white url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23666' viewBox='0 0 24 24'%3e%3cpath d='m7 10 5 5 5-5z'/%3e%3c/svg%3e") no-repeat right 12px center;
  background-size: 20px;
  appearance: none;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba($color-primary, 0.1);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23409eff' viewBox='0 0 24 24'%3e%3cpath d='m7 10 5 5 5-5z'/%3e%3c/svg%3e");
  }
  
  &:hover {
    border-color: rgba($color-primary, 0.5);
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
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: $color-text-muted;
  margin-top: $space-xs;
  
  span {
    flex: 1;
    text-align: center;
    
    &:first-child {
      text-align: left;
    }
    
    &:last-child {
      text-align: right;
    }
  }
}

.api-status {
  margin-bottom: $space-xs;
  padding: $space-xs $space-sm;
  background: rgba($color-success, 0.1);
  border: 1px solid $color-success;
  border-radius: $radius-sm;
  font-size: 12px;
  color: darken($color-success, 20%);
  @include font-medium;
}

.api-warning {
  margin-bottom: $space-xs;
  padding: $space-xs $space-sm;
  background: rgba($color-warning, 0.1);
  border: 1px solid $color-warning;
  border-radius: $radius-sm;
  font-size: 12px;
  color: darken($color-warning, 30%);
  @include font-medium;
}

.api-input-optional {
  opacity: 0.6;
  font-size: 12px;
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