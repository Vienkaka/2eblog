const getImageRatio = (url) => {
  if (url) {
    const regex = /\/(\d+)\/(\d+)\.jpg/
    const matches = url.match(regex)

    if (matches) {
      const width = matches[1]
      const height = matches[2]

      return { width, height }
    } else {
      return { width: 100, height: 100 }
    }
  }
  return { width: 100, height: 100 }
}

export default getImageRatio
