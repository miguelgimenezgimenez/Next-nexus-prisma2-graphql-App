import Router from 'next/router'
import { useMutation } from '@apollo/client'


import { Form } from '../../styles/common'
import Error from '../ErrorMessage'
import useForm from '../../utils/useForm'
import PhoneForm from '../PhoneForm'
import { GET_PHONE_QUERY } from '../../graphql/queries'
import { UPDATE_PHONE_MUTATION } from '../../graphql/mutations'




function UpdatePhone({ phone }) {
  // because apollo queries initially give us undefined (during loading state) and we can't early return from a component with hooks underneath, we use an effect to "watch" the initial state. When it finally does come in, we update it
  const { id } = phone

  const { inputs, handleChange } = useForm(phone || {
    name: '',
    brand_id: '',
    dimensions: '',
    os: '',
    storage: '',
    imageURL: ''
  })


  const [updatePhone, { loading, error }] = useMutation(
    UPDATE_PHONE_MUTATION,
    {
      variables: {
        id,
        ...inputs,
        brand_id: parseInt(inputs.brand_id)
      },
      // haven't found the best way to update the cache when updating
      refetchQueries: [{ query: GET_PHONE_QUERY, variables: { id } }]
    }
  )


  if (loading) return <p>Loading...</p>


  return (
    <Form
      onSubmit={async e => {
        e.preventDefault()
        const res = await updatePhone()
        Router.push({
          pathname: '/phone',
          query: { id: res.data.updatePhone.id },
        })
      }}
    >
      <p>{phone.name}</p>
      <Error error={error} />
      <PhoneForm handleChange={handleChange} loading={loading} inputs={inputs} ></PhoneForm>
      <button type="submit">Submit</button>

    </Form>
  )
}


export default UpdatePhone

