import { useState, useEffect } from 'react'

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial)

  function handleChange(e) {
    let { value, name, type } = e.target
    if (type === 'number') {
      value = parseInt(value)
    }
    setInputs({
      ...inputs,
      [name]: value,
    })
  }

  return {
    inputs,
    handleChange
  }
}
