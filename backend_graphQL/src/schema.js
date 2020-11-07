const { makeSchema, objectType, intArg, stringArg } = require('@nexus/schema')
const { nexusPrisma } = require('nexus-plugin-prisma')
const typeDefs = require('./graphql')

// Link;Image;Name;Release date;Weight;OS;Storage;Fans;Popularity;Hits;Screen_size;Screen_resolution;RAM;SOC;Battery;net2g;gprstext;edge;year;status;dimensions;weight;sim;displaytype;displaysize;displayresolution;displayother;memoryslot;cam1modules;wlan;bluetooth;gps;radio;usb;sensors;featuresother;batdescription1;batstandby1;battalktime1;colors;net3g;net4g;speed;bodyother;displayprotection;os;chipset;cpu;gpu;internalmemory;cam1features;cam1video;cam2modules;cam2video;nfc;price;sar-us;sar-eu;build;memoryother;optionalother;cam2features;models;net5g;tbench;batlife;batmusicplayback1

const schema = makeSchema({
  types: typeDefs,
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
})



module.exports = { schema }
