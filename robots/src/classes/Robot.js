import { DEAD, ALIVE, CARDINAL_DIRECTIONS, FORWARD, LEFT, RIGHT, LOST } from '../constants.js'

import Vector from './Vector.js';

class Robot {
  constructor(id, position, orientation, commands) {
    this.id = id
    this.position = position
    this.orientation = orientation
    this.commands = commands
    this.status = ALIVE
    this.planetExplored = []
  }

  static create(artifactInfo, commands) {
    const [id, x, y, orientation] = artifactInfo

    const [orientationX, orientationY] = CARDINAL_DIRECTIONS[orientation]
    if (orientationX === undefined || orientationY === undefined) throw new TypeError("Orientation provided not valid")
    if (typeof commands !== 'string') throw new TypeError("Commands must be a string")
    if (commands.length > 100) throw new RangeError('Maximum command length is 100')

    const position = new Vector(x, y)
    const orientationVector = new Vector(orientationX, orientationY)
    return new Robot(id, position, orientationVector, commands)
  }



  async explore(planet) {
    const nextPos = this.position.moveForward(this.orientation)
    const outOfBounds = nextPos.x > planet.width || nextPos.y > planet.height
    const planetInfo = planet.getInfo(this.position)
    if (planetInfo !== DEAD && outOfBounds) {
      await planet.markMapArea(this.position, DEAD)
      this.status = LOST
      return Promise.resolve()
    }
    if (planetInfo === DEAD && outOfBounds) {
      return Promise.resolve()
    }
    const nextplanetInfo = planet.getInfo(nextPos)
    if (nextplanetInfo === "X") {
      this.planetExplored.push(nextplanetInfo)
      await planet.markMapArea(nextPos, this.id)
    }
    this.position = nextPos
    return Promise.resolve()
  }


  sendMessage(msg) {
    console.log('sendmessage', msg)
    // return new Promise(res => res())
  }
  async *commandGenerator(planet) {
    let index = 0;
    while (index < this.commands.length) {
      const command = this.commands[index];
      switch (command) {
        case FORWARD:
          await this.explore(planet)
          break
        case LEFT:
          this.orientation = this.orientation.turnLeft()
          break
        case RIGHT:
          this.orientation = this.orientation.turnRight()
          break
        default:
          this.sendMessage(`Command ${command} not recognised`)
      }
      if (this.status === LOST) {
        return
      }
      index++
      yield
    }
  }

  async executeCommands(planet) {
    const currentInfo = planet.getInfo(this.position)
    this.planetExplored.push(currentInfo)
    await planet.markMapArea(this.position, this.id)
    for await (const item of this.commandGenerator(planet)) {
      // console.log(planet)
    }

    return Promise.resolve()
  }


}

export default Robot