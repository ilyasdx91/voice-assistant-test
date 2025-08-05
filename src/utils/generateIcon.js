// Генерация иконок для PWA программно
export function generateIcon(size) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  
  const ctx = canvas.getContext('2d')
  
  // Создаем градиентный фон
  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, '#1788D8')
  gradient.addColorStop(1, '#2a709b')
  
  // Рисуем закругленный прямоугольник
  const radius = size * 0.167 // 32px для 192px
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.roundRect(0, 0, size, size, radius)
  ctx.fill()
  
  // Рисуем микрофон
  const centerX = size / 2
  const centerY = size / 2
  const micWidth = size * 0.125 // 24px для 192px
  const micHeight = size * 0.208 // 40px для 192px
  
  ctx.fillStyle = 'white'
  ctx.beginPath()
  ctx.roundRect(centerX - micWidth/2, centerY - micHeight/2, micWidth, micHeight, micWidth/4)
  ctx.fill()
  
  // Рисуем основание микрофона
  ctx.strokeStyle = 'white'
  ctx.lineWidth = size * 0.02
  ctx.beginPath()
  ctx.arc(centerX, centerY + micHeight/3, micWidth * 0.8, 0, Math.PI, false)
  ctx.stroke()
  
  // Рисуем стойку
  ctx.beginPath()
  ctx.moveTo(centerX, centerY + micHeight/2)
  ctx.lineTo(centerX, centerY + micHeight * 0.8)
  ctx.stroke()
  
  return canvas.toDataURL('image/png')
}

// Создание и скачивание иконок
export function createIcons() {
  // 192x192
  const icon192 = generateIcon(192)
  const link192 = document.createElement('a')
  link192.download = 'icon-192.png'
  link192.href = icon192
  link192.click()
  
  // 512x512
  const icon512 = generateIcon(512)
  const link512 = document.createElement('a')
  link512.download = 'icon-512.png'
  link512.href = icon512
  link512.click()
}