import * as React from 'react'
/**
 * Values of fields in the form
 */
export interface FormikValues {
  [field: string]: any
}
/**
 * An object containing error messages whose keys correspond to FormikValues.
 */
export type FormikErrors<Values> = {[K in keyof Values]?: string}

/**
 * An object containing touched state of the form whose keys correspond to FormikValues.
 */
export type FormikTouched<Values> = {[K in keyof Values]?: boolean}

/**
 * Formik local state tree
 */
export interface FormikState<Values> {
  /** Form values */
  values: Values
  /** map of field names to specific error for that field */
  errors: FormikErrors<Values>
  /** map of field names to whether the field has been touched */
  touched: FormikTouched<Values>
  /** whether the form is currently submitting */
  isSubmitting: boolean
}

/**
 *  Formik state helpers
 */
export interface FormikHelpers<Values> {
  /** Manually set values object  */
  setValues(values: Values, shouldValidate?: boolean): void
  /** Manually set errors object */
  setErrors(errors: FormikErrors<Values>): void
  /** Manually set touched object */
  setTouched(touched: FormikTouched<Values>, shouldValidate?: boolean): void
  /** Manually set isSubmitting */
  setSubmitting(isSubmitting: boolean): void
  /** Reset form */
  resetForm(nextState?: Partial<FormikState<Values>>): void
  /** Set Formik state, careful! */
  setFormikState(
    f: FormikState<Values> | ((prevState: FormikState<Values>) => FormikState<Values>),
    cb?: () => void,
  ): void
}
/**
 * Formik form event handlers
 */
export interface FormikHandlers {
  /** Classic React change handler, keyed by input name */
  handleChange(e: React.ChangeEvent<any>): void
  /** Classic React blur handler, keyed by input name */
  handleBlur(e: React.FocusEvent<any>): void
  /** Form submit handler */
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  /** Reset form event handler  */
  handleReset: (e?: React.SyntheticEvent<any>) => void
}

/**
 * Formik computed properties. These are read-only.
 */
export interface FormikComputedProps<Values> {
  /** True if any input has been touched. False otherwise. */
  readonly dirty: boolean
  /** True if state.errors is empty */
  readonly isValid: boolean
  /** The initial values of the form */
  readonly initialValues: Values
}

/**
 * <Formik /> props
 */
export interface FormikProps<Values> {
  /**
   * Initial values of the form, its keys determines the shape of form.
   */
  initialValues: Values

  /**
   * Submission handler
   */
  onSubmit: (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>

  /**
   * Reset handler
   */
  onReset?: (values: Values, formikHelpers: FormikHelpers<Values>) => void

  /**
   * Validation function. Must return an error object where that object keys map to corresponding value.
   */
  validate?: (values: Values) => FormikErrors<Values>

  /** Tells Formik to validate the form on each input's onChange event */
  validateOnChange?: boolean

  /** Tells Formik to validate the form on each input's onBlur event */
  validateOnBlur?: boolean

  /**
   * React children or child render callback
   */
  children?: ((props: FormikConfig<Values>) => React.ReactNode) | React.ReactNode
}

export type FormikConfig<Values> = FormikState<Values> &
  FormikHelpers<Values> &
  FormikHandlers &
  FormikComputedProps<Values>

export type FormikContextType<Values> = FormikConfig<Values> & Pick<FormikProps<Values>, 'validate'>
