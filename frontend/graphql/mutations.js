import gql from 'graphql-tag'

export const UPDATE_PHONE_MUTATION = gql`
mutation UPDATE_PHONE_MUTATION(
  $name: String!
  $id: Int!
  $brand_id: Int!
  $image: String,
  $dimensions: String
  $os: String,
  $storage: String,
) {
  updatePhone(
    id:$id
    name:$name
    brand_id:$brand_id
    image:$image
    dimensions:$dimensions
    os:$os
    storage:$storage
  ) {
    id
  }
}
`


export const ADD_PHONE_MUTATION = gql`
  mutation ADD_PHONE_MUTATION(
    $name: String!
    $brand_id: Int!
    $image: String,
    $dimensions: String
    $os: String,
    $storage: String,
  ) {
    addPhone(
        name:$name
        brand_id:$brand_id
        image:$image
        dimensions:$dimensions
        os:$os
        storage:$storage
    ) {
      id 
    }
  }
`


export const DELETE_PHONE_MUTATION = gql`
  mutation DELETE_PHONE_MUTATION($id: Int!) {
    deletePhone(id: $id) {
      id
    }
  }
`