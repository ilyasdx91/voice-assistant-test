<template>
  <main class="voice-assistant">
    <div class="assistant-container">
      <!-- Основная область помощника -->
      <div class="assistant-main">
        <h1>Привет! я Limа</h1>
        <h3>ваш голосовой помощник</h3>

        <div class="robot">
          <img 
            src="@/assets/voice-assistant-1.png" 
            :class="{ 'robot-hidden': isActive }"
            class="robot-image robot-1"
          />
          <img 
            src="@/assets/voice-assistant-2.png" 
            :class="{ 'robot-visible': isActive }"
            class="robot-image robot-2"
          />

          <div 
            class="speaker" 
            :class="{ 'speaker-active': isActive }"
          >
            <div class="pulse-ring ring-1"></div>
            <div class="pulse-ring ring-2"></div>
            <div class="pulse-ring ring-3"></div>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M15 4.25c0-1.08-1.274-1.651-2.08-.935L8.427 7.31a.75.75 0 0 1-.498.19H4.25A2.25 2.25 0 0 0 2 9.748v4.497a2.25 2.25 0 0 0 2.25 2.25h3.68a.75.75 0 0 1 .498.19l4.491 3.993c.806.717 2.081.145 2.081-.934V4.25zM9.425 8.43L13.5 4.806v14.382l-4.075-3.623a2.25 2.25 0 0 0-1.495-.569H4.25a.75.75 0 0 1-.75-.75V9.748a.75.75 0 0 1 .75-.75h3.68a2.25 2.25 0 0 0 1.495-.568zm9.567-2.533a.75.75 0 0 1 1.049.156A9.959 9.959 0 0 1 22 12a9.96 9.96 0 0 1-1.96 5.947a.75.75 0 1 1-1.205-.893A8.459 8.459 0 0 0 20.5 12a8.459 8.459 0 0 0-1.665-5.053a.75.75 0 0 1 .157-1.05zm-1.849 2.472a.75.75 0 0 1 1.017.302c.536.991.84 2.125.84 3.329a6.973 6.973 0 0 1-.84 3.328a.75.75 0 0 1-1.32-.714c.42-.777.66-1.667.66-2.615c0-.947-.24-1.837-.66-2.614a.75.75 0 0 1 .303-1.016z" fill="currentColor"></path></g></svg>
          </div>
        </div>


        <div class="robot-txt">
          <p>✨ Готов помочь! О чём поговорим?</p>
        </div>

        <button 
          class="btn btn-voice"
          @mousedown="startRecording"
          @mouseup="stopRecording"
          @touchstart="startRecording"
          @touchend="stopRecording"
        >
          <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.00001 12C6.16668 12 5.45835 11.7083 4.87501 11.125C4.29168 10.5417 4.00001 9.83333 4.00001 9V3C4.00001 2.16667 4.29168 1.45833 4.87501 0.875C5.45835 0.291667 6.16668 0 7.00001 0C7.83335 0 8.54168 0.291667 9.12501 0.875C9.70835 1.45833 10 2.16667 10 3V9C10 9.83333 9.70835 10.5417 9.12501 11.125C8.54168 11.7083 7.83335 12 7.00001 12ZM6.00001 18V15.925C4.46668 15.7083 3.15418 15.0583 2.06251 13.975C0.970847 12.8917 0.308347 11.575 0.0750141 10.025C0.0416808 9.74167 0.116681 9.5 0.300014 9.3C0.483347 9.1 0.716681 9 1.00001 9C1.28335 9 1.52085 9.09583 1.71251 9.2875C1.90418 9.47917 2.03335 9.71667 2.10001 10C2.33335 11.1667 2.91251 12.125 3.83751 12.875C4.76251 13.625 5.81668 14 7.00001 14C8.20001 14 9.25835 13.6208 10.175 12.8625C11.0917 12.1042 11.6667 11.15 11.9 10C11.9667 9.71667 12.0958 9.47917 12.2875 9.2875C12.4792 9.09583 12.7167 9 13 9C13.2833 9 13.5167 9.1 13.7 9.3C13.8833 9.5 13.9583 9.74167 13.925 10.025C13.6917 11.5417 13.0333 12.85 11.95 13.95C10.8667 15.05 9.55001 15.7083 8.00001 15.925V18C8.00001 18.2833 7.90418 18.5208 7.71251 18.7125C7.52085 18.9042 7.28335 19 7.00001 19C6.71668 19 6.47918 18.9042 6.28751 18.7125C6.09585 18.5208 6.00001 18.2833 6.00001 18ZM7.00001 10C7.28335 10 7.52085 9.90417 7.71251 9.7125C7.90418 9.52083 8.00001 9.28333 8.00001 9V3C8.00001 2.71667 7.90418 2.47917 7.71251 2.2875C7.52085 2.09583 7.28335 2 7.00001 2C6.71668 2 6.47918 2.09583 6.28751 2.2875C6.09585 2.47917 6.00001 2.71667 6.00001 3V9C6.00001 9.28333 6.09585 9.52083 6.28751 9.7125C6.47918 9.90417 6.71668 10 7.00001 10Z" fill="#F3F3F3"/>
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(false)

const startRecording = () => {
  isActive.value = true
  console.log('Начало записи...')
}

const stopRecording = () => {
  isActive.value = false
  console.log('Конец записи...')
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.voice-assistant {
  flex: 1;
  padding: $space-2xl 0;
  min-height: calc(100vh - 70px);
  @include flex-center;
  flex-direction: column;

  .assistant-main{
    color: #fff;
    text-align: center;
    
    h1{
      background: linear-gradient(90deg, #1788D8 0%, #71BBF0 50%, #408CFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: $font-weight-medium;
      font-size: 3rem;
    }

    h3{
      font-size: 1.5rem;
      color: #f5f5f5;
    }

    .robot{
      max-width: 200px;
      margin: auto;
      position: relative;
      
      .robot-image{
        width: 100%;
        height: auto;
        transition: all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        transform-origin: center;
      }
      
      .robot-1{
        position: relative;
        opacity: 1;
        transform: rotateY(0deg) scale(1);
        
        &.robot-hidden{
          opacity: 0;
          transform: rotateY(-90deg) scale(0.8);
        }
      }
      
      .robot-2{
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transform: rotateY(90deg) scale(0.8);
        
        &.robot-visible{
          opacity: 1;
          transform: rotateY(0deg) scale(1);
        }
      }

      .speaker{
        width: 30px;
        height: 30px;
        position: absolute;
        top: 30px;
        right: 0;
        padding: 5px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $color-green;
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        
        &.speaker-active {
          opacity: 1;
          transform: scale(1);
          background-color: $color-green-dark;
          animation: pulse-speaker 2s infinite;
          
          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid rgba(white, 0.8);
            background: transparent;
            transform: translate(-50%, -50%);
            animation: pulse-ring 2.5s infinite;
          }
          
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid rgba(white, 0.6);
            background: transparent;
            transform: translate(-50%, -50%);
            animation: pulse-ring 2.5s infinite 0.8s;
          }
        }
        
        svg {
          width: 16px;
          height: 16px;
          color: white;
          position: relative;
          z-index: 2;
        }
      }
    }
    
    .robot-txt{
      margin-top: $space-xl;
      margin-bottom: $space-md;
      p{
        color: rgba(white, 0.9);
        font-size: 1.2rem;
        @include font-medium;
        padding: $space-md $space-lg;
        background: rgba(white, 0.1);
        border-radius: $radius-full;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(white, 0.2);
      }
    }

    .btn-voice{
      background: radial-gradient(circle,rgba(174, 219, 242, 1) 0%, rgba(133, 214, 254, 1) 17%, rgba(104, 205, 255, 1) 30%, rgba(74, 195, 255, 1) 43%, rgba(56, 184, 248, 1) 53%, rgba(22, 175, 251, 1) 72%, rgba(4, 169, 251, 1) 84%, rgba(0, 144, 216, 1) 100%);
      border-radius: $radius-full;
      width: 80px;
      height: 80px;
    }
  }
}

.assistant-container {
  max-width: 800px;
  width: 100%;
  padding: 0 $space-lg;
}

// Анимации для speaker
@keyframes pulse-speaker {
  0%, 100% {
    transform: scale(1);
    background-color: $color-green-dark;
  }
  50% {
    transform: scale(1.1);
    background-color: #1fa81a;
  }
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.8);
    opacity: 0;
  }
}

</style>