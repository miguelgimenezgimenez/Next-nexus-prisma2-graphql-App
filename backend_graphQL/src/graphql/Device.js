const { objectType, extendType, stringArg, intArg } = require('@nexus/schema')

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
    t.field('getAllDevices', {
      nullable: false,
      type: 'Device',
      list: true,
      async resolve(_root, _args, ctx) {
        console.log(ctx.req)
        const devices = await ctx.prisma.device.findMany()
        return devices
      },
    }),
      t.list.field('getDevice', {
        type: 'Device',
        async resolve(_root, args, ctx) {
          const result = await ctx.prisma.user.findOne({
            where: {
              id: args.id,
            },
          })
          return result
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
            ...args
          },
        })
        ctx.prisma.device.create(device)
        return device
      },
    }),
      t.field('edit', {
        type: 'Device',
        args: {
          id: intArg({ required: true }),
        },
        async resolve(_root, args, ctx) {
          const device = await ctx.prisma.device.update({
            where: { id: args.id },
            data: { ...args },
          })
          // TODO add edit logic EDIT
          return device
        },
      })
  },
})


module.exports = { Device, DeviceQuery, DeviceMutation }