import * as React from 'react'
import {FormikContextType} from './types'

export const FormikContext = React.createContext<FormikContextType<any>>(undefined as any)
export const FormikProvider = FormikContext.Provider
export const FormikConsumer = FormikContext.Consumer

export function useFormikContext<Values>() {
  return React.useContext<FormikContextType<Values>>(FormikContext)
}
