import Mission from "./classes/Mission.js";
import fs from 'fs'

// test('should ', () => {

fs.readFile('input.txt', 'utf8', async function (err, data) {
  if (err) throw err;
  console.log('OK: ');
  // console.log(data)
  const mission = Mission.create(data)
  await mission.start()
  console.log(mission.missionArtifacts)
});

// })
