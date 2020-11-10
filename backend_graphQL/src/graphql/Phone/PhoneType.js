const { objectType } = require('@nexus/schema')

const Phone = objectType({
  name: 'Phone',
  definition(t) {
    t.int('id')
    t.string('name')
    t.int('brand_id')
    t.string('link')
    t.string('image')
    t.string('dimensions')
    t.string('os')
    t.string('storage')
  },
})
module.exports = Phone