import * as React from 'react'
import {FormikProvider} from './FormikContext'
import {
  FormikValues,
  FormikErrors,
  FormikTouched,
  FormikState,
  FormikHelpers,
  FormikHandlers,
  FormikComputedProps,
  FormikProps,
} from './types'

enum actions {
  SET_VALUES = 'SET_VALUES',
  SET_ERRORS = 'SET_ERRORS',
  SET_TOUCHED = 'SET_TOUCHED',
  SET_ISSUBMITTING = 'SET_ISSUBMITTING',
  SET_FORMIK_STATE = 'SET_FORMIK_STATE',
  RESET_FORM = 'RESET_FORM',
  SUBMIT_ATTEMPT = 'SUBMIT_ATTEMPT',
  SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
  SUBMIT_FAILURE = 'SUBMIT_FAILURE',
}

// We already used FormikActions. So we'll go all Elm-y, and use Message.
type FormikMessage<Values> =
  | {type: 'SET_VALUES'; payload: Values}
  | {type: 'SET_ERRORS'; payload: FormikErrors<Values>}
  | {type: 'SET_TOUCHED'; payload: FormikTouched<Values>}
  | {type: 'SET_ISSUBMITTING'; payload: boolean}
  | {type: 'SET_FORMIK_STATE'; payload: (s: FormikState<Values>) => FormikState<Values>}
  | {type: 'RESET_FORM'; payload: FormikState<Values>}
  | {type: 'SUBMIT_ATTEMPT'}
  | {type: 'SUBMIT_SUCCESS'}
  | {type: 'SUBMIT_FAILURE'}

// State reducer
function formikReducer<Values>(state: FormikState<Values>, msg: FormikMessage<Values>) {
  switch (msg.type) {
    case 'SET_VALUES':
      return {...state, values: msg.payload}
    case 'SET_TOUCHED':
      return {...state, touched: msg.payload}
    case 'SET_ERRORS':
      return {...state, errors: msg.payload}
    case 'SET_ISSUBMITTING':
      return {...state, isSubmitting: msg.payload}
    case 'RESET_FORM':
      return {...state, ...msg.payload}
    case 'SET_FORMIK_STATE':
      return msg.payload(state)
    case 'SUBMIT_ATTEMPT':
      return {
        ...state,
        touched: Object.keys(state.values).reduce((acc, key) => {
          acc[key as keyof Values] = true
          return acc
        }, {} as FormikTouched<Values>),
        isSubmitting: true,
      }
    case 'SUBMIT_FAILURE':
      return {
        ...state,
        isSubmitting: false,
      }
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
      }
    default:
      return state
  }
}

// Custom Hook
export function useFormik<Values extends FormikValues = FormikValues>(props: FormikProps<Values>) {
  const {initialValues, onSubmit, onReset, validate, validateOnBlur = true, validateOnChange = true} = props

  const isMounted = React.useRef<boolean>(false)
  React.useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  function runValidations(vals: Values) {
    if (validate) {
      const errors = validate(vals)
      setErrors(errors)
      return errors
    }
    return state.errors
  }

  // Local State
  const [state, dispatch] = React.useReducer<React.Reducer<FormikState<Values>, FormikMessage<Values>>>(formikReducer, {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  })

  //#region Local State Helpers
  function setValues(values: Values) {
    dispatch({type: actions.SET_VALUES, payload: values})
  }

  function setErrors(errors: FormikErrors<Values>) {
    dispatch({type: actions.SET_ERRORS, payload: errors})
  }

  function setTouched(touched: FormikTouched<Values>) {
    dispatch({type: actions.SET_TOUCHED, payload: touched})
  }

  function setSubmitting(isSubmitting: boolean) {
    dispatch({type: actions.SET_ISSUBMITTING, payload: isSubmitting})
  }

  function submitForm() {
    return onSubmit(state.values, getFormikHelpers())
  }

  function setFormikState(f: FormikState<Values>) {
    dispatch({type: actions.SET_FORMIK_STATE, payload: (s) => ({...s, ...f})})
  }

  function resetForm(nextValues?: Values) {
    const values = nextValues || initialValues
    setFormikState({values, errors: {}, touched: {}, isSubmitting: false})
  }
  //#endregion

  //#region Form Event Handlers
  function handleChange(event: React.ChangeEvent<any>) {
    event.persist()

    const target = event.target
    const name = target.name as string
    const value = target.type === 'checkbox' ? target.checked : target.value

    const updatedValues = {...state.values, [name]: value}
    setValues(updatedValues)

    if (validateOnChange) {
      runValidations(updatedValues)
    }
  }

  function handleBlur(event: React.ChangeEvent<any>) {
    const name = event.target.name as string
    setTouched({...state.touched, [name]: true})

    if (validateOnBlur) {
      runValidations(state.values)
    }
  }

  function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    if (e && e.preventDefault) {
      e.preventDefault()
    }

    // touch all the fields if not already
    dispatch({type: 'SUBMIT_ATTEMPT'})
    // run validations
    const errors = runValidations(state.values)

    const isFormValid = Object.keys(errors).length === 0
    if (isFormValid) {
      let promiseOrUndefined
      try {
        promiseOrUndefined = submitForm()
        // Bail if it's sync, consumer is responsible for cleaning up
        // via setSubmitting(false)
        if (promiseOrUndefined === undefined) {
          return
        }
      } catch (error) {
        throw error
      }

      return Promise.resolve(promiseOrUndefined)
        .then(() => {
          if (!!isMounted.current) {
            dispatch({type: 'SUBMIT_SUCCESS'})
          }
        })
        .catch((_errors) => {
          if (!!isMounted.current) {
            dispatch({type: 'SUBMIT_FAILURE'})
            // This is a legit error rejected by the onSubmit fn
            // so we don't want to break the promise chain
            throw _errors
          }
        })
    }
  }

  function handleReset() {
    if (onReset) {
      onReset(state.values, getFormikHelpers())
    } else {
      resetForm()
    }
  }
  //#endregion

  // Local State Helpers
  function getFormikHelpers(): FormikHelpers<Values> {
    return {
      setValues,
      setErrors,
      setTouched,
      setSubmitting,
      setFormikState,
      resetForm,
    }
  }

  // Form Event Handlers
  function getFormikHandlers(): FormikHandlers {
    return {
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset,
    }
  }

  // Computed Props
  function getFormikComputedProps(): FormikComputedProps<Values> {
    const dirty = !isEqual(initialValues, state.values)
    const isValid = Object.keys(state.errors).length === 0
    return {
      dirty,
      isValid,
      initialValues,
    }
  }

  // returns
  // local state
  // local state helpers
  // form event handlers
  // computed props
  const formikBag = {
    ...state,
    ...getFormikHelpers(),
    ...getFormikHandlers(),
    ...getFormikComputedProps(),
  }

  return formikBag
}

// Formik Component
export function Formik<Values extends FormikValues = FormikValues, ExtraProps = {}>(
  props: FormikProps<Values> & ExtraProps,
) {
  const formikbag = useFormik<Values>(props)
  const {children} = props

  return (
    <FormikProvider value={formikbag}>{typeof children === 'function' ? children(formikbag) : children}</FormikProvider>
  )
}

function isEqual(obj1: any, obj2: any) {
  const keysLengthEqual = Object.keys(obj1).length === Object.keys(obj2).length
  if (!keysLengthEqual) {
    return false
  }

  // From here onwards, keys length should be equal
  const allkeysEqual = Object.keys(obj2).every((key2) => {
    return Object.keys(obj1).some((key1) => key1 === key2)
  })
  if (!allkeysEqual) {
    return false
  }

  return Object.keys(obj1).every((key) => {
    return obj1[key] === obj2[key]
  })
}
