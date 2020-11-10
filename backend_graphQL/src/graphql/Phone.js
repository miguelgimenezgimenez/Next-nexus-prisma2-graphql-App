const { objectType, extendType, stringArg, intArg } = require('@nexus/schema')

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

const PhoneQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getAllPhones', {
      nullable: false,
      type: 'Phone',
      list: true,
      async resolve(_root, _args, ctx) {
        const phones = await ctx.prisma.phone.findMany()
        return phones
      },
    }),
      t.list.field('getBrandsPhones', {
        type: 'Phone',
        args: {
          brand_id: intArg({ required: true }),
        },
        async resolve(_root, args, ctx) {
          const brandsPhones = await ctx.prisma.phone
            .findMany({ where: { brand_id: args.brand_id } })
          return brandsPhones
        },
      }),
      t.list.field('getPhone', {
        type: 'Phone',
        args: {
          id: intArg({ required: true }),
        },
        async resolve(_root, args, ctx) {
          const result = await ctx.prisma.phone.findOne({
            where: {
              id: args.id,
            },
          })
          return result
        },
      })

  },

})
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
      t.field('edit', {
        type: 'Phone',
        args: {
          id: intArg({ required: true }),
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


module.exports = { Phone, PhoneQuery, PhoneMutation }