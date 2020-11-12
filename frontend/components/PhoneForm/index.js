import React from 'react'
import { useLocalState } from '../../LocalState'

export default function PhoneForm({ handleChange, loading, inputs }) {
  const { brands } = useLocalState()
  return (
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
      <select required type="number" value={inputs.brand_id} onChange={handleChange} name="brand_id" id="brand_id">
          <option value="" disabled >
            Select your option
            </option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}

        </select>

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
    </fieldset>
  )
}
