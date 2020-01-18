import React from 'react'
import * as L from './core-components/layout/layout'
import {SubReddit} from './examples/subreddit/SubReddit'
// import logo from './logo.svg'
import './App.css'

import {ThemeProvider} from 'emotion-theming'
import theme from './utils/theme'
import {TourOfHeroes} from './examples/tour-of-heroes/TourOfHeroes'

const Root: React.FC = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

const App: React.FC = () => {
  return (
    <L.Layout>
      <Root>
        <TourOfHeroes />
        <SubReddit />
      </Root>
    </L.Layout>
  )
}

export default App
