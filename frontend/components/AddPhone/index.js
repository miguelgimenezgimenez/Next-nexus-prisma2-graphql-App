import React from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../../utils/useForm';
import { Form } from '../styles/common';
import ErrorMessage from '../ErrorMessage';
import { ALL_PHONES_QUERY } from '../Phones';
import { PAGINATION_QUERY } from '../Pagination';


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
    brand_id: 1,
    image: "",
    dimensions: "",
    os: "",
    storage: ""
  });
  const [addPhone, { loading, error }] = useMutation(ADD_PHONE_MUTATION, {
    variables: inputs,
    // update,
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
          pathname: '/phones',
          query: { id: res.data.addPhone.id },
        });
      }}
    >
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>

        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            required
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="brand_id">
          Brand
          <input
            type="number"
            id="brand"
            name="Brand"
            placeholder="brand"
            required
            // value={inputs.brand_id}
            value={1}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="dimensions">
          Dimensions
          <input
            id="dimensions"
            name="dimensions"
            placeholder="Dimension"
            value={inputs.dimensions}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="os">
          OS
          <textarea
            id="os"
            name="os"
            placeholder="OS"
            value={inputs.os}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="storage">
          Storage
          <textarea
            id="storage"
            name="storage"
            placeholder="Storage"
            value={inputs.storage}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  );
}

export default AddPhone;
export { ADD_PHONE_MUTATION };
