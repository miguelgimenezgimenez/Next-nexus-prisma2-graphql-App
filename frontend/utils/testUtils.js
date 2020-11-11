import casual from 'casual';


casual.seed(777);
const mockBrand = () => ({
  id: 1,
  name: casual.name
});

const mockPhone = overrides => ({
  "id": 2,
  "name": casual.name,
  "image":"image.jpg",
  "brand_id": 1,
  "storage": "16GB/32GB storage, microSDXC",
  "dimensions": "260g, 9.4mm thickness",
  "os": "Android 6.0",
  ...overrides
});





export {
  mockBrand,
  mockPhone,
};
