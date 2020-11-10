import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';

import useForm from '../utils/useForm';
import { Form } from '../components/styles/common';
import ErrorMessage from '../components/ErrorMessage';
import { ALL_PHONES_QUERY } from '../components/PhonesList';
import { PAGINATION_QUERY } from '../components/Pagination';
import PhoneForm from '../components/PhoneForm';


const ADD_PHONE_MUTATION = gql`
  mutation ADD_PHONE_MUTATION(
    $name: String!
    $brand_id: String!
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
      name
     
    }
  }
`;


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
    variables: inputs,
    // update,a
    refetchQueries: [{ query: ALL_PHONES_QUERY }, { query: PAGINATION_QUERY }],
  });

  return (
    <Form
      data-testid="form"
      onSubmit={async e => {
        // Stop the form from submitting
        e.preventDefault();
        // call the mutation
        const res = await addPhone();
        console.log(res);
        // change them to the single item page
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
