import React from 'react'

export default function PhoneForm({ handleChange, loading, inputs}) {
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
      <select name="brand_id" id="brand_id">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
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
