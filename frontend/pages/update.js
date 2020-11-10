import Router from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import { Form } from '../Components/styles/common';
import Error from '../Components/ErrorMessage';
import useForm from '../utils/useForm';
import PhoneForm from '../components/PhoneForm';

const GET_PHONE_QUERY = gql`
  query GET_PHONE_QUERY($id: ID!) {
    Item(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;
const UPDATE_PHONE_MUTATION = gql`
  mutation UPDATE_PHONE_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateItem(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
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

  const { inputs, handleChange } = useForm(data.Item || {
    name: "",
    brand_id: "",
    image: "",
    dimensions: "",
    os: "",
    storage: ""
  });

  const [updateItem, { loading: updating, error }] = useMutation(
    UPDATE_PHONE_MUTATION,
    {
      variables: {
        id,
        ...inputs,
      },
    }
  );
  if (loading) return <p>Loading...</p>;
  if (!data || !data.Item) return <p>No Item Found for ID {id}</p>;

  return (
    <Form
      onSubmit={async e => {
        e.preventDefault();
        const res = await updateItem();
        Router.push({
          pathname: '/phones',
          query: { id: res.data.addPhone.id },
        });
      }}
    >
      <p>{data.Item.name}</p>
      <Error error={error} />
      <PhoneForm handleChange={handleChange} loading={updating} inputs={inputs} ></PhoneForm>

    </Form>
  );
}


export default UpdateItem;
export { UPDATE_PHONE_MUTATION };
