// const { makeSchema, objectType, intArg, stringArg } = require('@nexus/schema')
// const { nexusPrisma } = require('nexus-plugin-prisma')


// // Link;Image;Name;Release date;Weight;OS;Storage;Fans;Popularity;Hits;Screen_size;Screen_resolution;RAM;SOC;Battery;net2g;gprstext;edge;year;status;dimensions;weight;sim;displaytype;displaysize;displayresolution;displayother;memoryslot;cam1modules;wlan;bluetooth;gps;radio;usb;sensors;featuresother;batdescription1;batstandby1;battalktime1;colors;net3g;net4g;speed;bodyother;displayprotection;os;chipset;cpu;gpu;internalmemory;cam1features;cam1video;cam2modules;cam2video;nfc;price;sar-us;sar-eu;build;memoryother;optionalother;cam2features;models;net5g;tbench;batlife;batmusicplayback1


// const User = objectType({
//   name: 'User',
//   definition(t) {
//     t.model.id()
//     t.model.name()
//     t.model.email()
//     t.model.posts({
//       pagination: false,
//     })
//   },
// })

// const Post = objectType({
//   name: 'Post',
//   definition(t) {
//     t.model.id()
//     t.model.title()
//     t.model.content()
//     t.model.published()
//     t.model.author()
//   },
// })

// const Query = objectType({
//   name: 'Query',
//   definition(t) {
//     t.crud.post()

//     t.list.field('feed', {
//       type: 'Post',
//       resolve: (_, _args, ctx) => {
//         return ctx.prisma.post.findMany({
//           where: { published: true },
//         })
//       },
//     })

//     t.list.field('filterPosts', {
//       type: 'Post',
//       args: {
//         searchString: stringArg({ nullable: true }),
//       },
//       resolve: (_, { searchString }, ctx) => {
//         return ctx.prisma.post.findMany({
//           where: {
//             OR: [
//               { title: { contains: searchString } },
//               { content: { contains: searchString } },
//             ],
//           },
//         })
//       },
//     })
//   },
// })

// const Mutation = objectType({
//   name: 'Mutation',
//   definition(t) {
//     t.crud.createOneUser({ alias: 'signupUser' })
//     t.crud.deleteOnePost()

//     t.field('createDraft', {
//       type: 'Post',
//       args: {
//         title: stringArg(),
//         content: stringArg({ nullable: true }),
//         authorEmail: stringArg(),
//       },
//       resolve: (_, { title, content, authorEmail }, ctx) => {
//         return ctx.prisma.post.create({
//           data: {
//             title,
//             content,
//             published: false,
//             author: {
//               connect: { email: authorEmail },
//             },
//           },
//         })
//       },
//     })

//     t.field('publish', {
//       type: 'Post',
//       nullable: true,
//       args: {
//         id: intArg(),
//       },
//       resolve: (_, { id }, ctx) => {
//         return ctx.prisma.post.update({
//           where: { id: Number(id) },
//           data: { published: true },
//         })
//       },
//     })
//   },
// })

// const schema = makeSchema({
//   types: [Query, Mutation, Post, User],
//   plugins: [nexusPrisma({ experimentalCRUD: true })],
//   outputs: {
//     schema: __dirname + '/../../schema.graphql',
//     typegen: __dirname + '/generated/nexus.ts',
//   },
// })



// module.exports = { schema }
