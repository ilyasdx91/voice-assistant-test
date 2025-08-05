<template>
  <div id="app">
    <!-- Header Component -->
    <Header @openSettings="openSettings" />
    
    <!-- Main Voice Assistant Component -->
    <VoiceAssistant ref="voiceAssistantRef" />

    <!-- Settings Drawer -->
    <SettingsDrawer 
      :isOpen="isSettingsOpen"
      :recognitionLanguage="settings.recognitionLanguage"
      :voiceResponse="settings.voiceResponse"
      :ttsVoice="settings.ttsVoice"
      :ttsSpeed="settings.ttsSpeed"
      :apiKey="settings.apiKey"
      :backendUrl="settings.backendUrl"
      @close="closeSettings"
      @update:recognitionLanguage="settings.recognitionLanguage = $event"
      @update:voiceResponse="settings.voiceResponse = $event"
      @update:ttsVoice="settings.ttsVoice = $event"
      @update:ttsSpeed="settings.ttsSpeed = $event"
      @update:apiKey="settings.apiKey = $event"
      @update:backendUrl="settings.backendUrl = $event"
      @testTTS="testTTS"
    />

    <!-- Font Demo Component -->
<!--    <FontDemo />-->
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import Header from './components/Header.vue'
import VoiceAssistant from './components/VoiceAssistant.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'
import FontDemo from './components/FontDemo.vue'

const voiceAssistantRef = ref(null)
const isSettingsOpen = ref(false)

// Settings state
const settings = reactive({
  recognitionLanguage: 'auto',
  voiceResponse: true,
  ttsVoice: 'alloy',
  ttsSpeed: 1.0,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  backendUrl: import.meta.env.VITE_BACKEND_API_URL || 'https://7f200c12015b.ngrok-free.app/api/Assistant/query'
})

// Watch settings and sync with VoiceAssistant
watch(settings, () => {
  if (voiceAssistantRef.value) {
    voiceAssistantRef.value.recognitionLanguage = settings.recognitionLanguage
    voiceAssistantRef.value.voiceResponse = settings.voiceResponse
    voiceAssistantRef.value.ttsVoice = settings.ttsVoice
    voiceAssistantRef.value.ttsSpeed = settings.ttsSpeed
    voiceAssistantRef.value.apiKey = settings.apiKey
    voiceAssistantRef.value.backendUrl = settings.backendUrl
  }
}, { deep: true })

const openSettings = () => {
  // Sync current settings from VoiceAssistant
  if (voiceAssistantRef.value) {
    settings.recognitionLanguage = voiceAssistantRef.value.recognitionLanguage
    settings.voiceResponse = voiceAssistantRef.value.voiceResponse
    settings.ttsVoice = voiceAssistantRef.value.ttsVoice
    settings.ttsSpeed = voiceAssistantRef.value.ttsSpeed
    settings.apiKey = voiceAssistantRef.value.apiKey
    settings.backendUrl = voiceAssistantRef.value.backendUrl
  }
  isSettingsOpen.value = true
}

const closeSettings = () => {
  isSettingsOpen.value = false
}

const testTTS = () => {
  if (voiceAssistantRef.value) {
    voiceAssistantRef.value.testTTS()
  }
}
</script>

<style scoped lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>