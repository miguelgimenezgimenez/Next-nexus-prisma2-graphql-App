const Mission = require("../src/classes/Mission.js")
const { ALIVE, LOST } = require("../src/constants.js")

const input_single = `
Mars
5 3
Robot id1 1 1 E
RFRFRFRF
Robot id2 3 2 N
FRRFLLFFRRFLL
Robot id3 0 3 W
LLFFFLFLFL
`


it('Robots ends in correct position', async () => {

  const mission = Mission.create(input_single)
  const missionRobots = await mission.start()
  console.log(missionRobots)
  expect(missionRobots[0].position.x).toBe(1)
  expect(missionRobots[0].position.y).toBe(1)

  expect(missionRobots[1].position.x).toBe(3)
  expect(missionRobots[1].position.y).toBe(3)

  expect(missionRobots[2].position.x).toBe(2)
  expect(missionRobots[2].position.y).toBe(3)

})

it('Ends in correct orientation', async () => {
  const mission = Mission.create(input_single)
  const missionRobots = await mission.start()

  expect(missionRobots[0].orientation.x).toBe(1)
  expect(missionRobots[0].orientation.y).toBe(0) // East

  expect(missionRobots[1].orientation.x).toBe(0)
  expect(missionRobots[1].orientation.y).toBe(1)// North

  expect(missionRobots[2].orientation.x).toBe(0)
  expect(missionRobots[2].orientation.y).toBe(-1) //South


})
it('ends in correct statu ', async () => {
  const mission = Mission.create(input_single)
  const missionRobots = await mission.start()

  expect(missionRobots[0].status).toBe(ALIVE)

  expect(missionRobots[1].status).toBe(LOST)// North

  expect(missionRobots[2].status).toBe(ALIVE) //South


})
