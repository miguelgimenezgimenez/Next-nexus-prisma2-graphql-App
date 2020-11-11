const { extendType, intArg, stringArg } = require('@nexus/schema')
const { connectionFromArray } = require('graphql-relay')

const PhoneQuery = extendType({
  type: 'Query',
  definition(t) {

    t.connectionField('phoneConnection', {
      type: "Phone",
      args: {
        page: intArg({ required: false }),
        brand_id: intArg({ required: false }),
      },
      // yes , both are necessary
      additionalArgs: {
        page: intArg({ required: false }),
        brand_id: intArg({ required: false }),
      },
      extendConnection(t) {
        t.int('totalCount', {
          args: {
            brand_id: intArg({ required: false }),
          },
          resolve: async (source, args, ctx) => {
            const filter = {}
            if (args.brand_id) {
              filter.where = {
                brand_id: args.brand_id
              }
            }

            return await ctx.prisma.phone.count(filter)
          },
        })
      },
      // IF this method isnt added prisma yells, doesnt do anything 
      async totalCount() { },
      async resolve(root, args, ctx) {
        const skip = args.page - 1
        const filter = {
          orderBy: { name: 'asc' },
          skip: skip * args.first,
          take: args.first,
        }
        if (args.brand_id) {
          filter.where = {
            brand_id: args.brand_id
          }
        }
        // TODO pagination works, but isn't taking advantage of cursors.
        const phones = await ctx.prisma.phone.findMany(filter)
        return connectionFromArray(phones, args)
      },
    })
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

module.exports = PhoneQuery