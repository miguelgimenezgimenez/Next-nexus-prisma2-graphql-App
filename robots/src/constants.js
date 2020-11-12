const CARDINAL_DIRECTIONS = {
  'N': [0, 1],
  "E": [1, 0],
  "S": [0, -1],
  "W": [-1, 0]

}

const ALIVE = "Alive"
const LOST = "Lost"
const DEAD = "💀"

const RIGHT = 'R'
const FORWARD = 'F'
const LEFT = 'L'
const INITIAL_STATUS = 'Initial'
const MISSION_FAILED = 'Failed'

module.exports = {
  CARDINAL_DIRECTIONS,
  ALIVE,
  LOST,
  DEAD,
  RIGHT,
  FORWARD,
  LEFT,
  INITIAL_STATUS,
  MISSION_FAILED,
}