import { SCENT } from '../constants.js'
class Mars {
  constructor(height, width, map) {
    this.height = height;
    this.width = width;
    this.map = map;
  }
  static create(planetInfo) {
    let [width, height] = planetInfo.split(' ')
    // I am assuming height and width will be numbers
    width = Number(width)
    height = Number(height)
    if (height > 50 || width > 50) {
      throw new RangeError('Dimensions provided out of range')
    }
    const map = []
    let y
    for (y = 0; y < height + 1; y++) {
      const row = new Array(width + 1)
      row.fill('X')
      map.push(row)
    }
    return new Mars(height, width, map)
  }

  getInfo(position) {
    const discoveredItem = this.map[position.x][position.y]
    return discoveredItem
  }
  markMapArea(position, value) {
    return Promise.resolve()

  }


}

export default Mars