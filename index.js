/**
 *  32 Палитры
 *  16 Ячеек
 *  4 Цвета в ячейке
 *
 *  Ник может состоять из 128 символов
 *  Минимальная длинна ника 3 символа
 */

const fs = require('fs')
const readline = require('readline')
const Jimp = require('jimp')
const folder = 'avatars'
const usernameRegexp = new RegExp(/^(?=[a-zA-ZА-Яа-я\d_]{3,16}$)(?!.*_{2})[^_].*[^_]$/)
const { themes } = require('./themes.js')
const usernameChars = (() => {
  const char_A = 'A'.charCodeAt(0)
  const char_Z = 'Z'.charCodeAt(0)
  const char_a = 'a'.charCodeAt(0)
  const char_z = 'z'.charCodeAt(0)
  const char_AA = 'А'.charCodeAt(0)
  const char_YA = 'Я'.charCodeAt(0)
  const char_aa = 'а'.charCodeAt(0)
  const char_ya = 'я'.charCodeAt(0)
  const char_0 = '0'.charCodeAt(0)
  const char_9 = '9'.charCodeAt(0)
  let chars = []
  let char = char_A
  while (char <= char_Z) {
    chars.push(char)
    char++
  }
  char = char_a
  while (char <= char_z) {
    chars.push(char)
    char++
  }
  char = char_AA
  while (char <= char_YA) {
    chars.push(char)
    char++
  }
  char = char_aa
  while (char <= char_ya) {
    chars.push(char)
    char++
  }
  char = char_0
  while (char <= char_9) {
    chars.push(char)
    char++
  }
  chars.push('_'.charCodeAt(0))

  return String.fromCharCode(...chars)
})()

console.log(`usernameChars[${usernameChars.length}]:`, usernameChars)
console.log('You are welcome to avatar generator')
console.log('Type usernames or /clear /exit')

const hashFromUsername = (username) => {
  const imageData = [[],[],[],[],[],[],[],[]]
  const hash = usernameChars.indexOf(username[0])
    + usernameChars.indexOf(username[1]) * 128
    + usernameChars.indexOf(username[2]) * 128 * 128
    + usernameChars.indexOf(username[3] || undefined) * 128 * 128 * 128
  const sash = usernameChars.indexOf(username[username.length - 4] || undefined)
    + usernameChars.indexOf(username[username.length - 3]) * 128
    + usernameChars.indexOf(username[username.length - 2]) * 128 * 128
    + usernameChars.indexOf(username[username.length - 1]) * 128 * 128 * 128
  const { colors } = themes[hash & 0b1111]

  let x = 0
  let y = 0
  let p = 0
  while (y <= 3) {
    imageData[y][x] = colors[hash >> p & 0b11] // (hash >> p & 0b11).toString(2).padStart(2, '0')
    x++
    p += 2
    if (x >= 4) {
      x = 0
      y++
    }
  }
  p = 0
  y = 7;
  while (y >= 4) {
    imageData[y][x] = colors[sash >> p & 0b11] // (sash >> p & 0b11).toString(2).padStart(2, '0')
    x++
    p += 2
    if (x >= 4) {
      x = 0
      y--
    }
  }
  // console.log(imageData, hash.toString(2), hash.toString(2).length / 2, sash.toString(2), sash.toString(2).length
  // / 2)
  const image = new Jimp(8, 8, (err, image) => {
    if (err) throw err

    imageData.forEach((row, y) => {
      row.forEach((color, x) => {
        image.setPixelColor(color, x, y)
        image.setPixelColor(color, 7 - x, y)
      })
    })

    image.write(`avatars/${username}.png`, (err) => {
      if (err) throw err
    })
  })
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.addListener('line', text => {
  if (text === '/exit') {
    process.exit(0)
  } else if (text === 'clear') {
    console.log('Clearing!')
  } else {
    const usernames = text.split(' ')

    if (usernames && !fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    for (const username of usernames) {
      if (usernameRegexp.test(username)) {
        console.log(username, hashFromUsername(username))
      } else {
        console.error('Username is not valid')
      }
    }
  }
})
