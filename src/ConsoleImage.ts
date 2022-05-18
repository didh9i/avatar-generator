import Jimp from 'jimp'

const esc = String.fromCharCode(0x1B)

// ESC[ 38;2;⟨r⟩;⟨g⟩;⟨b⟩ m Select RGB foreground color
// ESC[ 48;2;⟨r⟩;⟨g⟩;⟨b⟩ m Select RGB background color
const pixel = (upper: Array<number>, bottom: Array<number>) => {
  if ((upper[0] | upper[1] | upper[2] | bottom[0] | bottom[1] | bottom[2]) === 0) {
    return esc + '[0m '
  }
  return `${esc}[48;2;${upper[0]};${upper[1]};${upper[2]}m${esc}[38;2;${bottom[0]};${bottom[1]};${bottom[2]}m▄`
}

export default function ConsoleImage (image: Jimp, name = ''): void {
  const w = image.bitmap.width, h = image.bitmap.height
  const pixels = Array.from(image.bitmap.data)
  let output = ''
  let ptr = 0

  console.log(`[Image ${name} ${w + '✕' + h}]`)
  while (ptr + w * 4 < pixels.length) {
    output += pixel(pixels.slice(ptr, ptr + 4), pixels.slice(ptr + w * 4, ptr + w * 4+ 4))
    ptr += 4
    if (ptr / 4 % w === 0) {
      ptr += 4 * w
      output += `${esc}[0m\n`;
    }
  }
  console.log(output)
}
