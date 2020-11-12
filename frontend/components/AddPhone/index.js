import Router from 'next/router';
import { useMutation } from '@apollo/client';

import useForm from '../../utils/useForm';
import { Form } from '../../styles/common';
import { ADD_PHONE_MUTATION } from '../../graphql/mutations';
import ErrorMessage from '../ErrorMessage';
import PhoneForm from '../PhoneForm';


function update(cache, payload) {
  cache.modify({
    fields: {
      phoneConnection({ nodes }) {
        return [payload.data.addPhone, ...nodes];
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
    storage: "",
    imageURL: ""
  });

  const [addPhone, { loading, error }] = useMutation(ADD_PHONE_MUTATION, {
    variables: { ...inputs, brand_id: parseInt(inputs.brand_id) },
    update,
  });

  return (
    <Form
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
      <button type="submit">Submit</button>

    </Form>
  );
}

export default AddPhone;
export { ADD_PHONE_MUTATION };
