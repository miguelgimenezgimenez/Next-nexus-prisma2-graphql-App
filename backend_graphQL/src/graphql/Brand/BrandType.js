const { objectType } = require('@nexus/schema')

const BrandType = objectType({
  name: 'Brand',
  definition(t) {
    t.int('id')
    t.string('name')
  }
})


module.exports = { BrandType }