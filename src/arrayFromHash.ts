export default function arrayFromHash (hash: string, length = 32): Array<number> {
  const array = Array.from(hash).slice(0, length / 2)

  return array
    .map((char: string): Array<string> => {
      return Array.from(parseInt(char, 16)
        .toString(4)
        .padStart(2, '0'))
    })
    .flat()
    .map((char) => parseInt(char))
}
