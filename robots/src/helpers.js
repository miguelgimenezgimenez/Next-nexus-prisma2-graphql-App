function* sequenceGenerator(sequence) {
  let currentValue = 0;
  while (currentValue < sequence.length) {
    yield sequence[currentValue];
    currentValue++;
  }
}


function* explore(surface) {
  const nextPos = this.position.moveForward(this.orientation)
  const outOfBounds = nextPos.x > surface.width || nextPos.y > surface.height
  let surfaceInfo = await surface.getInfo(this.position)

  if (surfaceInfo !== SCENT && outOfBounds) {
    surface.scent(this.position)
    this.status = LOST
    return LOST
  }
  if (surfaceInfo === SCENT && outOfBounds) {
    return
  }
  if (surfaceInfo === "X") {
    this.surfaceExplored.push(surface.getInfo(nextPos))
    surface.markMapArea(nextPos, this.id)
  }
  this.position = nextPos

}


const gen = sequenceGenerator("FFFFRRRRFFFF")
let done = false
while (!done) {
  const seq = gen.next()


}

module.exports = { sequenceGenerator }