import Mission from "../src/classes/Mission.js";

const input_single = `
Mars
5 5
Robot id1 0 0 N
FFFFFRFRFFFFFLFLFFFFFFRFRFFFFFLFLFFFFFFRFRFFFFFLFLFFFFFFRFRFFFFFLFLFFFFFFRFRFFFFFLFLF

`

it('Robot executes commands correctly', async () => {

  const mission = Mission.create(input_single)
  const missionResults = await mission.start()
  console.log(missionResults)


})