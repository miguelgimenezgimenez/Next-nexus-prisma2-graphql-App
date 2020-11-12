import { INITIAL_STATUS, MISSION_FAILED } from '../constants.js'
import Mars from './Mars.js'
import Robot from './Robot.js'

const artifacts = { "Robot": Robot }
const planets = { 'Mars': Mars }

class Mission {
  constructor(planet, missionArtifacts, status) {
    this.planet = planet
    this.missionArtifacts = missionArtifacts
    this.status = status
  }
  static create(input) {
    if (typeof input !== 'string') throw new TypeError('Input must be a string')

    const [planetName, planetInfo, ...missionArtifactsInstructions] = input.trim().split('\n')

    const planet = planets[planetName].create(planetInfo)

    const missionArtifacts = []
    for (let index = 0; index < missionArtifactsInstructions.length; index += 2) {
      const [type, ...artifactInfo] = missionArtifactsInstructions[index].split(' ')
      const commands = missionArtifactsInstructions[index + 1]
      if(!artifacts[type]) throw new TypeError("Wrong Artifact type specified, artifact name should be one of ['Robot',...]")
      const artifact = artifacts[type].create(artifactInfo, commands, index)
      missionArtifacts.push(artifact)
    }

    return new Mission(planet, missionArtifacts, INITIAL_STATUS)
  }

  async *missionArtifactGenerator() {
    let index = 0;
    while (index < this.missionArtifacts.length) {
      const missionResponse =this.missionArtifacts[index].executeCommands(this.planet)
      yield missionResponse
      index++
    }
  }

  async start() {
    for await (const missionResponse of this.missionArtifactGenerator()) {
    }
    return Promise.resolve(this.missionArtifacts)
  }
}

export default Mission