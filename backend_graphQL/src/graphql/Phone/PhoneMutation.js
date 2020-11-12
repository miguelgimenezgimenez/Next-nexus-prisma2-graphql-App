const { extendType, stringArg, intArg } = require('@nexus/schema')

const defaultImage = 'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro--.jpg'

const PhoneMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addPhone', {
      type: 'Phone',
      nullable: false,
      args: {
        name: stringArg({ required: true }),
        brand_id: intArg({ required: true }),
        image: stringArg({ required: false }),
        dimensions: stringArg({ required: false }),
        os: stringArg({ required: false }),
        storage: stringArg({ required: false }),
      },

      async resolve(_root, args, ctx) {
        const { brand_id } = args
        delete args.brand_id
        const phone = await ctx.prisma.phone.create({
          data: {
            ...args,
            image: defaultImage,
            Brand: {
              connect: {
                id: brand_id
              }
            }
          },
        })
        return phone
      },
    }),
      t.field('updatePhone', {
        type: 'Phone',
        args: {
          id: intArg({ required: true }),
          name: stringArg({ required: true }),
          brand_id: intArg({ required: true }),
          image: stringArg({ required: false }),
          dimensions: stringArg({ required: false }),
          os: stringArg({ required: false }),
          storage: stringArg({ required: false }),
        },
        async resolve(_root, args, ctx) {
          const { brand_id, id } = args
          // some people say it's not ok to use delete, but in this case i don't believe it's gonna hurt to use it ...
          delete args.brand_id
          delete args.id
          const phone = await ctx.prisma.phone.update({
            where: {
              id: id
            },
            data: {
              ...args,
              Brand: {
                connect: {
                  id: brand_id
                }
              }
            },
          })
          return phone
        },
      })
    t.field('deletePhone', {
      type: 'Phone',
      args: {
        id: intArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        const phone = await ctx.prisma.phone.delete({
          where: { id: args.id }
        })
        return phone
      },
    })
  },
})

module.exports = PhoneMutation