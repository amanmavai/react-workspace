import React from 'react'
import * as L from './core-components/layout/layout'
import {SubReddit} from './examples/subreddit/SubReddit'
// import logo from './logo.svg'
import './App.css'

import {ThemeProvider} from 'emotion-theming'
import theme from './utils/theme'
import {TourOfHeroes} from './examples/tour-of-heroes/TourOfHeroes'
import {ExampleForm} from './examples/form-example/ExampleForm'
import {Debug} from './core-components/Debug/Debug'

const Root: React.FC = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

const App: React.FC = () => {
  const components = [
    {component: <TourOfHeroes />, isVisible: false},
    {component: <SubReddit />, isVisible: false},
    {component: <ExampleForm />, isVisible: true},
    {component: <Debug o={{hello: 'one', fire: 'two', sure: {a: 1, b: 2}}} />, isVisible: true},
  ]
  return (
    <L.Layout>
      <Root>{components.filter((c) => c.isVisible).map((c) => c.component)}</Root>
    </L.Layout>
  )
}

export default App
