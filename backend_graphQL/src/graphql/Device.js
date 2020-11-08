const { objectType, extendType, stringArg, intArg } = require('@nexus/schema')



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
    t.string('brand')
    t.string('link')
    t.string('image')
    t.string('dimensions')
    t.string('os')
    t.string('storage')
  },
})

const DeviceQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getDevices', {
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
        brand: stringArg({ required: true }),
        link: stringArg({ required: false }),
        image: stringArg({ required: false }),
        dimensions: stringArg({ required: false }),
        os: stringArg({ required: false }),
        storage: stringArg({ required: false }),
      },

      async resolve(_root, args, ctx) {
        const device = await ctx.prisma.device.create({
          data: {
            name: args.name,
            brand: args.brand,
            link: args.link,
            image: args.image,
            dimensions: args.dimensions,
            os: args.os,
            storage: args.storage,
          },
        })
        console.log(device)
       
        ctx.prisma.device.create(device)
        return device
      },
    }),
      t.field('edit', {
        type: 'Device',
        args: {
          draftId: intArg({ required: true }),
        },
        resolve(_root, args, ctx) {
          let draftToPublish = ctx.db.posts.find(p => p.id === args.draftId)
          if (!draftToPublish) {
            throw new Error('Could not find draft with id ' + args.draftId)
          }
          draftToPublish.published = true
          return draftToPublish
        },
      })
  },
})


module.exports = { Device, DeviceQuery, DeviceMutation }