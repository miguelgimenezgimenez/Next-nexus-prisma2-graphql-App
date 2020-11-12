class Vector {
  constructor(x, y) {
    this.x = parseInt(x)
    this.y = parseInt(y)
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