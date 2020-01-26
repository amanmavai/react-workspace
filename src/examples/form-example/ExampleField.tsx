import React from 'react'

interface Props {
  fieldName: string
  labelName: string
  f: any
}
export function ExampleField(props: Props) {
  const {fieldName, labelName, f} = props
  return (
    <>
      <label>{labelName}: </label>
      <input type="text" name={fieldName} onChange={f.handleChange} onBlur={f.handleBlur} value={f.values[fieldName]} />
      {f.errors[fieldName] && f.touched[fieldName] && f.errors[fieldName]}
    </>
  )
}
