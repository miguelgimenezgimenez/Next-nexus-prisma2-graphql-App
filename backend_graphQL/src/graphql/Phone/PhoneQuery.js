const { extendType, intArg, stringArg } = require('@nexus/schema')

const PhoneQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('getAllPhones', {
      nullable: false,
      type: 'Phone',
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
      t.field('getPhone', {
        type: 'Phone',
        args: {
          id: stringArg({ required: true }),
        },

        async resolve(_root, args, ctx) {
          const result = await ctx.prisma.phone.findOne({
            where: {
              id: Number(args.id),

            },
          })

          return result
        },
      })

  },

})

module.exports = PhoneQuery