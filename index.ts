import * as readline from 'readline'
import Avatar from './src/Avatar'
import usernameRegExp from './src/usernameRegExp'
import Skin from './src/Skin'
import ConsoleImage from './src/ConsoleImage'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let mode = 'default'
let action = 'default'

rl.addListener('line', line => {
  if (line[0] === '/') {
    if (line === '/exit') {
      rl.close()
      process.exit(0)
    }

    if (line === '/skin') {
      mode = 'skin'
      console.log('Mode set to "skin"')
      return
    }

    if (line === '/avatar') {
      mode = 'avatar'
      console.log('Mode set to "avatar"')
      return
    }

    if (line === '/default') {
      mode = 'default'
      console.log('Mode set to "default"')
      return
    }

    if (line === '/all') {
      action = 'default'
      console.log('Action set to "default"')
      return
    }

    if (line === '/display') {
      action = 'display'
      console.log('Action set to "display"')
      return
    }

    if (line === '/save') {
      action = 'save'
      console.log('Action set to "save"')
      return
    }

    console.warn('Unknown command')
  } else {
    const time = Date.now()
    const usernames = line.split(' ')
    for (const username of usernames) {
      if (usernameRegExp.test(username)) {
        if (mode === 'avatar' || mode === 'default') {
          const avatar = new Avatar(username)
          if (action === 'display' || action === 'all') {
            ConsoleImage(avatar.image, username)
          }
          if (action === 'save' || action === 'default') {
            avatar.save(32)
          }
        }
        if (mode === 'skin' || mode === 'default') {
          const skin = new Skin(username)
          if (action === 'display' || action === 'default') {
            ConsoleImage(skin.image.clone()
              .crop(0, 0, 64, 32), username)
          }
          if (action === 'save' || action === 'default') {
            skin.save()
          }
        }
      }
      else {
        console.warn(`Invalid Username "${username}"`)
      }
    }

    if (usernames.length > 4) {
      const diff = Date.now() - time
      const sec = diff / 1000
      console.log(sec, 'sec.')
    }

  }
})
