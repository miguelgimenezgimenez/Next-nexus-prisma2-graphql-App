import React from 'react'

export default function PhoneForm({ handleChange, loading, inputs }) {
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
      <select required type="number" onChange={handleChange} name="brand_id" id="brand_id">
          <option value="" disabled selected>Select your option</option>
          <option value={1}>Saab</option>
          <option value={1}>Mercedes</option>
          <option value={1}>Audi</option>
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
      <button type="submit">Submit</button>
    </fieldset>
  )
}
