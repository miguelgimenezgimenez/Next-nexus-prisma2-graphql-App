const { createTestContext } = require('../../../tests/__helpers')
const ctx = createTestContext()
it('ensures that a phone can be created and updated', async () => {
  // Create a new draft
  const draftResult = await ctx.client.request(`
    mutation {
      addPhone(name: "Nexus", brand_id: 1) {  
        name
        id
      }
    }
  `)


  expect(draftResult).toMatchSnapshot(`
    Object {
      "addPhone": Object {
        "id":${draftResult.addPhone.id},
        "name": "Nexus"
      },
    }
  `)
  const publishResult = await ctx.client.request(
    `
    mutation updatePhone($id: Int!,$brand_id: Int!,$name:String!) {
      updatePhone(id: $id, name:$name, brand_id:$brand_id) {
        id
        name
      }
    }
  `,
    { id: draftResult.addPhone.id, brand_id: 1, name: 'UpdatedName' },
  )

  expect(publishResult).toMatchSnapshot(`
    Object {
      "updatePhone": Object {
        "id": ${draftResult.addPhone.id},
        "name": "UpdatedName"
      }
    }
  `)
  const persistedData = await ctx.db.phone.findMany()

  expect(persistedData).toMatchSnapshot(`
     [
       {
        "brand_id": 1,
        "dimensions": null,
        "id": 1,
        "image": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro--.jpg",
        "link": null,
        "name": "UpdatedName",
        "os": null,
        "storage": null
      }
    ]
  `)
})
