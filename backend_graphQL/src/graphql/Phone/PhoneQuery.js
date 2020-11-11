const { extendType, intArg, stringArg } = require('@nexus/schema')
const { connectionFromArray } = require('graphql-relay')

const PhoneQuery = extendType({
  type: 'Query',
  definition(t) {

    t.connectionField('phoneConnection', {
      type: "Phone",
      additionalArgs: {
        page: intArg({ required: false }),
      },
      extendConnection(t) {
        t.int('totalCount', {
          resolve: async (source, args, ctx) => await ctx.prisma.phone.count(),
        })

      },
      // IF this method isnt added prisma yells ????
      async totalCount() { },
      async resolve(root, args, ctx) {
        let phones
        if (args.page && !args.after) {
          phones = await ctx.prisma.phone.findMany({
            orderBy: { name: 'desc' },
            skip: args.page * args.first,
            take: args.first,
          })
        } else {
          phones = await ctx.prisma.phone.findMany({
            orderBy: { name: 'asc' }
          })

        }
        return connectionFromArray(phones, args)
      },
    })
    t.field('getAllPhones', {
      list: true,
      pagination: true,
      nullable: false,
      type: 'Phone',
      args: {
        page: intArg({ required: true }),
        perPage: intArg({ required: true }),
      },
      async resolve(_root, { page, perPage }, ctx) {
        const count = await ctx.prisma.phone.count()
        const phones = await ctx.prisma.phone.findMany({
          orderBy: { name: 'desc' },
          skip: page,
          take: perPage,
        })
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