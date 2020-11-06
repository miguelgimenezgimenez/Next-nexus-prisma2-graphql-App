class Vector {
  constructor(x, y) {
    this.x = Number(x)
    this.y = Number(y)
  }
  turnRight() {
    return new Vector(this.y, -this.x)
  }
  turnLeft() {
    return new Vector(-this.y, this.x)
  }

  moveForward(vector) {
    return new Vector(this.x + vector.x, this.y + vector.y)
  }
}
export default Vector