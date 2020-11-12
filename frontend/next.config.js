const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        BACKEND_URL: "http://localhost:4000"
      }
    }
  }

  return {
    /* config options for all phases except development here */
  }
}