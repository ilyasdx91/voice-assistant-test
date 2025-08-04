<template>
  <div class="font-demo">
    <h2 class="demo-title">Inter Font Weights Demo</h2>
    
    <div class="font-samples">
      <div class="font-sample">
        <span class="weight-label">Thin (100)</span>
        <p class="sample-text font-thin">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      
      <div class="font-sample">
        <span class="weight-label">ExtraLight (200)</span>
        <p class="sample-text font-extralight">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      
      <div class="font-sample">
        <span class="weight-label">Light (300)</span>
        <p class="sample-text font-light">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      
      <div class="font-sample">
        <span class="weight-label">Normal (400)</span>
        <p class="sample-text font-normal">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      
      <div class="font-sample">
        <span class="weight-label">Medium (500)</span>
        <p class="sample-text font-medium">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      
      <div class="font-sample">
        <span class="weight-label">SemiBold (600)</span>
        <p class="sample-text font-semibold">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      
      <div class="font-sample">
        <span class="weight-label">Bold (700)</span>
        <p class="sample-text font-bold">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      
      <div class="font-sample">
        <span class="weight-label">ExtraBold (800)</span>
        <p class="sample-text font-extrabold">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
      
      <div class="font-sample">
        <span class="weight-label">Black (900)</span>
        <p class="sample-text font-black">
          The quick brown fox jumps over the lazy dog
        </p>
      </div>
    </div>
    
    <div class="size-demo">
      <h3 class="demo-subtitle">Different Sizes with Medium Weight</h3>
      <p class="size-sample font-medium" style="font-size: 12px;">12px - Small text</p>
      <p class="size-sample font-medium" style="font-size: 14px;">14px - Body text</p>
      <p class="size-sample font-medium" style="font-size: 16px;">16px - Default size</p>
      <p class="size-sample font-medium" style="font-size: 18px;">18px - Large text</p>
      <p class="size-sample font-medium" style="font-size: 24px;">24px - Heading</p>
      <p class="size-sample font-medium" style="font-size: 32px;">32px - Large heading</p>
    </div>
  </div>
</template>

<script setup>
// This component demonstrates all available Inter font weights
</script>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/mixins';

.font-demo {
  max-width: 800px;
  margin: $space-2xl auto;
  padding: $space-2xl;
  @include card;
}

.demo-title {
  text-align: center;
  margin-bottom: $space-2xl;
  @include font-bold;
  color: $color-heading;
  font-size: 2rem;
}

.demo-subtitle {
  margin: $space-2xl 0 $space-lg 0;
  @include font-semibold;
  color: $color-text;
  border-bottom: 2px solid rgba($color-primary-light, 0.3);
  padding-bottom: $space-sm;
}

.font-samples {
  display: flex;
  flex-direction: column;
  gap: $space-lg;
}

.font-sample {
  @include flex-start;
  gap: $space-lg;
  padding: $space-md;
  background: rgba($color-primary-light, 0.1);
  border-radius: $radius-md;
  border-left: 4px solid $color-primary;
}

.weight-label {
  min-width: 140px;
  @include font-medium;
  color: #666;
  font-size: 14px;
}

.sample-text {
  flex: 1;
  margin: 0;
  font-size: 18px;
  color: $color-text;
}

.size-demo {
  margin-top: $space-2xl;
  padding-top: $space-2xl;
  border-top: 1px solid rgba($color-border, 0.5);
}

.size-sample {
  margin: $space-sm 0;
  color: $color-text;
}

/* Responsive design */
@include respond-to('md') {
  .font-sample {
    flex-direction: column;
    align-items: flex-start;
    gap: $space-sm;
  }
  
  .weight-label {
    min-width: auto;
  }
  
  .sample-text {
    font-size: 16px;
  }
  
  .demo-title {
    font-size: 1.5rem;
  }
}
</style>