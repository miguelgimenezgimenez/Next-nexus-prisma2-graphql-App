import casual from 'casual'


casual.seed(777)
const mockBrand = (overrides) => ({
  id: 1,
  name: casual.name,
  ...overrides
  
})

const mockPhone = overrides => ({
  'id': 2,
  'name': casual.name,
  'image':casual.name,
  'brand_id': 1,
  'storage': casual.text,
  'dimensions': casual.catch_phrase,
  'os': casual.company_name,
  ...overrides
})





export {
  mockBrand,
  mockPhone,
}
