import React from 'react'
import { useMutation } from '@apollo/client'

import { DELETE_PHONE_MUTATION } from '../../graphql/mutations'

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deletePhone))
}

function DeleteItem({ id, children }) {
  const [deleteItem] = useMutation(DELETE_PHONE_MUTATION, {
    variables: { id },
    update,
  })
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteItem()
            .catch(err => {
              alert(err.message)
            })
        }
      }}
    >
      {children}
    </button>
  )
}

export default DeleteItem
