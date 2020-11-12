import gql from 'graphql-tag'
import { PER_PAGE } from '../constants'

export const GET_BRANDS_QUERY = gql`
query GET_BRANDS_QUERY  {
  getAllBrands {
   name
   id
  }
}
`;

export const PHONE_CONNECTION_QUERY = gql`
  query PHONE_CONNECTION_QUERY( 
    $first: Int = ${PER_PAGE},
    $after:String=${null}, 
    $page:Int=1
    $brand_id:Int)  
     {
    phoneConnection(first: $first,after:$after, page:$page, brand_id:$brand_id ) {
      pageInfo{
        startCursor
        endCursor
      }
      totalCount(brand_id:$brand_id)
      nodes{
        id
        name
        brand_id
        image      
      }
    }
  }
`;


export const GET_PHONE_QUERY = gql`
  query GET_PHONE_QUERY($id: Int!) {
    getPhone(id:$id) {
      id
      name
      brand_id
      image
      dimensions
      os
      storage          
    }
  }
`;