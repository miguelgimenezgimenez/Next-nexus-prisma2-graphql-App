const constants = require('../constants.js')
const Vector = require('./Vector.js')

const { DEAD, ALIVE, CARDINAL_DIRECTIONS, FORWARD, LEFT, RIGHT, LOST } = constants
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
      planet.markMapArea(this.position, DEAD)
      this.status = LOST
      await this.sendMessage()
      return Promise.resolve()
    }
    if (planetInfo === DEAD && outOfBounds) {
      return Promise.resolve()
    }
    const nextplanetInfo = planet.getInfo(nextPos)
    if (nextplanetInfo === "X") {
      this.planetExplored.push(nextplanetInfo)
      planet.markMapArea(nextPos, this.id)
      await this.sendMessage()
    }
    this.position = nextPos
    return Promise.resolve()
  }


  sendMessage(msg) {
    //  Here I was supposed to send a RabbitMQ message to the backend, which would have a subscription with the frontend and would update a hypothetic map every time the robot moves.

    return Promise.resolve()

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
    planet.markMapArea(this.position, this.id)
    // I am iteration over a generator so I need the for await of loop, ( wanted to see how this works) But don't need the output of the generator.
    // This loop will wait for every command to finish to loop to the next item, the reason for this is because the message sending would have been asynchronous and I wanted to delay the execution of the command to make the robot move slowly in the map.
    for await (const item of this.commandGenerator(planet)) { }
    return Promise.resolve()
  }


}

module.exports = Robot