type ColorFontData = {
  fontSize: number
  color: string
  backgroundColor: string
}

export const useColorFontDate = (size: number = 50) => {
  const style = getComputedStyle(document.documentElement)
  const map = new Map<number, ColorFontData>()
  map.set(2, {
    fontSize: size * 0.5,
    color: style.getPropertyValue('--font-color-2'),
    backgroundColor: style.getPropertyValue('--background-color-2'),
  })
  map.set(4, {
    fontSize: size * 0.5,
    color: style.getPropertyValue('--font-color-4'),
    backgroundColor: style.getPropertyValue('--background-color-4'),
  })
  map.set(8, {
    fontSize: size * 0.5,
    color: style.getPropertyValue('--font-color-8'),
    backgroundColor: style.getPropertyValue('--background-color-8'),
  })
  map.set(16, {
    fontSize: size * 0.5,
    color: style.getPropertyValue('--font-color-16'),
    backgroundColor: style.getPropertyValue('--background-color-16'),
  })
  map.set(32, {
    fontSize: size * 0.5,
    color: style.getPropertyValue('--font-color-32'),
    backgroundColor: style.getPropertyValue('--background-color-32'),
  })
  map.set(64, {
    fontSize: size * 0.5,
    color: style.getPropertyValue('--font-color-64'),
    backgroundColor: style.getPropertyValue('--background-color-64'),
  })
  map.set(128, {
    fontSize: size * 0.33,
    color: style.getPropertyValue('--font-color-128'),
    backgroundColor: style.getPropertyValue('--background-color-128'),
  })
  map.set(256, {
    fontSize: size * 0.33,
    color: style.getPropertyValue('--font-color-256'),
    backgroundColor: style.getPropertyValue('--background-color-256'),
  })
  map.set(512, {
    fontSize: size * 0.33,
    color: style.getPropertyValue('--font-color-512'),
    backgroundColor: style.getPropertyValue('--background-color-512'),
  })
  map.set(1024, {
    fontSize: size * 0.25,
    color: style.getPropertyValue('--font-color-1024'),
    backgroundColor: style.getPropertyValue('--background-color-1024'),
  })
  map.set(2048, {
    fontSize: size * 0.25,
    color: style.getPropertyValue('--font-color-2048'),
    backgroundColor: style.getPropertyValue('--background-color-2048'),
  })
  map.set(4096, {
    fontSize: size * 0.25,
    color: style.getPropertyValue('--font-color-2048'),
    backgroundColor: style.getPropertyValue('--background-color-4096'),
  })
  map.set(8192, {
    fontSize: size * 0.25,
    color: style.getPropertyValue('--font-color-2048'),
    backgroundColor: style.getPropertyValue('--background-color-8192'),
  })
  map.set(16384, {
    fontSize: size * 0.2,
    color: style.getPropertyValue('--font-color-2048'),
    backgroundColor: style.getPropertyValue('--background-color-16384'),
  })
  map.set(32768, {
    fontSize: size * 0.2,
    color: style.getPropertyValue('--font-color-2048'),
    backgroundColor: style.getPropertyValue('--background-color-32768'),
  })

  return map
}
