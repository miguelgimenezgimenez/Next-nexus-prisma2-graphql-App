
const { extendType, stringArg } = require('@nexus/schema')

const PhoneMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addPhone', {
      type: 'Phone',
      nullable: false,
      args: {
        name: stringArg({ required: true }),
        brand_id: stringArg({ required: true }),
        image: stringArg({ required: false }),
        dimensions: stringArg({ required: false }),
        os: stringArg({ required: false }),
        storage: stringArg({ required: false }),
      },

      async resolve(_root, args, ctx) {
        const { name, image, dimensions, os, storage } = args
        console.log(typeof args.brand_id)
        const phone = await ctx.prisma.phone.create({
          data: {
            name,
            image,
            dimensions,
            os,
            storage,
            Brand: {
              connect: {
                id: Number(args.brand_id)
              }
            }
          },
        })
        ctx.prisma.phone.create(phone)
        return phone
      },
    }),
      t.field('editPhone', {
        type: 'Phone',
        args: {
          id: stringArg({ required: true }),
          name: stringArg({ required: true }),
          brand_id: stringArg({ required: true }),
          image: stringArg({ required: false }),
          dimensions: stringArg({ required: false }),
          os: stringArg({ required: false }),
          storage: stringArg({ required: false }),

        },
        async resolve(_root, args, ctx) {
          const phone = await ctx.prisma.phone.update({
            where: { id: args.id },
            data: { ...args },
          })
          // TODO add edit logic EDIT
          return phone
        },
      })
  },
})

module.exports = PhoneMutation