import md5 from 'md5'
import themes, { Theme } from './themes'

export default function getThemeFromHash (hash: string): Theme {
  return themes[parseInt(md5(hash).slice(0, 2), 16) % themes.length]
}
