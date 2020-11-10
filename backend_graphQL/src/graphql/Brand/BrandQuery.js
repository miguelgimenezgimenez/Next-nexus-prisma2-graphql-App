const { extendType } = require('@nexus/schema')

const BrandQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('getAllBrands', {
      nullable: false,
      type: 'Brand',
      list: true,
      async resolve(_root, _args, ctx) {
        const brands = await ctx.prisma.brand.findMany()
        return brands
      },
    })
  }
})

module.exports = BrandQuery