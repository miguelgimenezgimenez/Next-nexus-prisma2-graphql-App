import { SCENT, ALIVE, CARDINAL_DIRECTIONS, FORWARD, LEFT, RIGHT, LOST } from '../constants.js'

import Vector from './Vector.js';

class Robot {
  constructor(id, position, orientation, commands) {
    this.id = id
    this.position = position
    this.orientation = orientation
    this.commands = commands
    this.status = ALIVE
    this.surfaceExplored = []
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

  recognisePosition(position) {

  }

  async explore(surface) {
    const nextPos = this.position.moveForward(this.orientation)
    const outOfBounds = nextPos.x > surface.width || nextPos.y > surface.height
    console.log('begfor')
    let surfaceInfo = await surface.getInfo(this.position)
    console.log('after')
    console.log('surfaceInfo', surfaceInfo)
    if (surfaceInfo !== SCENT && outOfBounds) {
      surface.scent(this.position)
      this.status = LOST
      return Promise.resolve()
    }
    if (surfaceInfo === SCENT && outOfBounds) {
      return Promise.resolve()
    }
    if (surfaceInfo === "X") {
      this.surfaceExplored.push(surface.getInfo(nextPos))
      surface.markMapArea(nextPos, this.id)
    }
    this.position = nextPos
    return Promise.resolve()
  }


  sendMessage(msg) {
    console.log('sendmessage')
    // return new Promise(res => res())
  }
  async *asyncGenerator(surface) {
    let index = 0;
    while (index < this.commands.length) {
      const command = this.commands[index];
      console.log(command)
      switch (command) {
        case FORWARD:
          await this.explore(surface)
          yield;
        case LEFT:
          this.orientation = this.orientation.turnLeft()
          yield
        case RIGHT:
          this.orientation = this.orientation.turnRight()
          yield
        default:
          this.sendMessage(`Command ${command} not recognised`)
      }
      console.log(this.status)
      if (this.status === LOST) {
        return
      }
      index++
      yield command
    }
  }

  async executeCommands(surface) {
    this.surfaceExplored.push(surface.getInfo(this.position))
    surface.markMapArea(this.position, this.id)
    for await (const item of this.asyncGenerator(surface)) {
      console.log('next command',item)
    }

  }


}

export default Robot