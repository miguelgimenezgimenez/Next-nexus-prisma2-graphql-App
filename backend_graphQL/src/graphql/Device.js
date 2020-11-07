const { objectType, extendType, stringArg } = require('@nexus/schema')



// export const Post = objectType({
//   name: 'Post',            // <- Name of your type
//   definition(t) {
//     t.int('id')            // <- Field named `id` of type `Int`
//     t.string('title')      // <- Field named `title` of type `String`
//     t.string('body')       // <- Field named `body` of type `String`
//     t.boolean('published') // <- Field named `published` of type `Boolean`
//   },
// })
const Device = objectType({
  name: 'Device',
  definition(t) {
    t.int('id')
    t.string('name')
    // t.string('releaseDate')
    t.string('os')
  },
})

const DeviceQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('drafts', {
      nullable: false,
      type: 'Device',
      list: true,
      async resolve(_root, _args, ctx) {
        const devices = await ctx.prisma.device.findMany()
        return devices
      },
    })
  },

})
const DeviceMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addDevice', {
      type: 'Device',
      nullable: false,
      args: {
        name: stringArg({ required: true }),
        os: stringArg({ required: true }),
      },
      
      resolve(_root, args, ctx) {
        const device = {
          name: args.name,
          os: args.os,
        }
        ctx.prisma.device.create(device)
        return device
      },
    })
  },
})


module.exports = { Device, DeviceQuery, DeviceMutation }