import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { Form } from '../components/styles/common';
import Error from '../components/ErrorMessage';
import useForm from '../utils/useForm';
import PhoneForm from '../components/PhoneForm';
import { GET_PHONE_QUERY } from '../components/PhoneDetail'

const UPDATE_PHONE_MUTATION = gql`
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
`;
function UpdateItem({ query }) {

  const { id } = query

  const { data = {}, loading } = useQuery(GET_PHONE_QUERY, {
    variables: {
      id,
    },
  });

  const { inputs, handleChange } = useForm(data.getPhone || {
    name: "",
    brand_id: "",
    image: "",
    dimensions: "",
    os: "",
    storage: ""
  });
  console.log(inputs)

  const [updatePhone, { loading: updating, error }] = useMutation(
    UPDATE_PHONE_MUTATION,
    {
      variables: {
        id,
        ...inputs,
        brand_id: parseInt(inputs.brand_id)
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (!data || !data.getPhone) return <p>No Item Found for ID {id}</p>;

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        const res = await updatePhone();
        console.log(res)
        Router.push({
          pathname: '/phone',
          query: { id: res.data.updatePhone.id },
        });
      }}
    >
      <p>{data.getPhone.name}</p>
      <Error error={error} />
      <PhoneForm handleChange={handleChange} loading={updating} inputs={inputs} ></PhoneForm>

    </Form>
  );
}


export default UpdateItem;
export { UPDATE_PHONE_MUTATION };
