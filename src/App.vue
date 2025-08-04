<template>
  <div id="app">
    <!-- Header Component -->
    <Header />
    
    <!-- Main Voice Assistant Component -->
    <VoiceAssistant />

    <!-- Font Demo Component -->
<!--    <FontDemo />-->
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import VoiceAssistant from './components/VoiceAssistant.vue'
import FontDemo from './components/FontDemo.vue'
</script>

<style scoped lang="scss">
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>