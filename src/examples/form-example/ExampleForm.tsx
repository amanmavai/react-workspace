import * as React from 'react'
import {Formik} from '../../core-components/formik/Formik'
import {Debug} from '../../core-components/formik/Debug'
import {ExampleField} from './ExampleField'

export function ExampleForm() {
  return (
    <Formik
      initialValues={{name: '', color: '', gender: ''}}
      onSubmit={(values, formikHelpers) => {
        alert({values, formikHelpers})
      }}
      validate={(values) => {
        const errors = {} as any
        if (!values.name) {
          errors.name = 'Required'
        }

        if (!values.color) {
          errors.color = 'Required'
        }

        if (!values.gender) {
          errors.gender = 'Required'
        }

        return errors
      }}
    >
      {(f) => (
        <form onSubmit={f.handleSubmit}>
          <ExampleField fieldName={'name'} labelName={'Name'} f={f} />
          <br />
          <ExampleField fieldName={'color'} labelName={'Color'} f={f} />
          <br />
          <ExampleField fieldName={'gender'} labelName={'Gender'} f={f} />
          <br />
          <button type="submit" disabled={f.isSubmitting}>
            Submit
          </button>
          <Debug formik={f} />
        </form>
      )}
    </Formik>
  )
}
