const table = 'fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF'
const tr = {}
for (let i = 0; i < 58; i++) {
  tr[table[i]] = i
}
const s = [11, 10, 3, 8, 4, 6]
const xor = 177451812
const add = 8728348608

function enc(value) {
  const x = (value ^ xor) + add
  const r = ['B', 'V', '1', ' ', ' ', '4', ' ', '1', ' ', '7', ' ', ' ']
  for (let i = 0; i < 6; i++) {
    r[s[i]] = table[Math.floor(x / 58 ** i) % 58]
  }
  let result = ''
  for (let i = 0; i < 12; i++) result += r[i]
  return result
}

function dec(value) {
  let r = 0
  for (let i = 0; i < 6; i++) {
    r += tr[value[s[i]]] * 58 ** i
  }
  return (r - add) ^ xor
}

export { enc, dec }
