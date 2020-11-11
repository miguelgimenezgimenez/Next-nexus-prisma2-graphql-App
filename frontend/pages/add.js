import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

import useForm from '../utils/useForm';
import { Form } from '../components/styles/common';
import ErrorMessage from '../components/ErrorMessage';
import { PHONE_CONNECTION_QUERY } from '../components/PhonesList';
import PhoneForm from '../components/PhoneForm';


const ADD_PHONE_MUTATION = gql`
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
`;

function update(cache, payload) {
  cache.modify({
    id: cache.identify(payload.data.addPhone),
    fields: {
      allItems(items) {
        return [payload.data.addPhone, ...items];
      },
    }
  });
}
function AddPhone() {
  const { inputs, handleChange } = useForm({
    name: "",
    brand_id: "",
    image: "",
    dimensions: "",
    os: "",
    storage: ""
  });

  const [addPhone, { loading, error }] = useMutation(ADD_PHONE_MUTATION, {
    variables: { ...inputs, brand_id: parseInt(inputs.brand_id) },
    update,
    // refetchQueries: [{ query: PHONE_CONNECTION_QUERY }]
  });

  return (
    <Form
      data-testid="form"
      onSubmit={async e => {
        e.preventDefault();
        const res = await addPhone();
        Router.push({
          pathname: '/phone',
          query: { id: res.data.addPhone.id },
        });
      }}
    >
      <ErrorMessage error={error} />
      <PhoneForm handleChange={handleChange} loading={loading} inputs={inputs} ></PhoneForm>
    </Form>
  );
}

export default AddPhone;
export { ADD_PHONE_MUTATION };
