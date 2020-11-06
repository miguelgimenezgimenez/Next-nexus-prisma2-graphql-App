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

  explore(surface) {
    const nextPos = this.position.moveForward(this.orientation)
    const outOfBounds = nextPos.x > surface.width || nextPos.y > surface.height
    let surfaceInfo = surface.getInfo(this.position)
    if (surfaceInfo !== SCENT && outOfBounds) {
      surface.scent(this.position)
      this.status = LOST
      return LOST
    } else {
      this.surfaceExplored.push(surface.getInfo(nextPos))
      surface.markMapArea(this.id)
      this.position = nextPos
    }
  }


  sendMessage(msg) {
    // TODO SEND RABBIT MQ MESSAGE
  }

  executeCommands(surface) {

    for (let index = 0; index < this.commands.length; index++) {
      const command = this.commands[index];
      switch (command) {
        case FORWARD:
          this.explore(surface)       
          break;
        case LEFT:
          this.orientation = this.orientation.turnLeft()
          break
        case RIGHT:
          this.orientation = this.orientation.turnRight()
          break
        default:
          this.sendMessage(`Command ${command} not recognised`)
      }
      if (this.status===LOST) {
        return
      }
    }
  }


}

export default Robot