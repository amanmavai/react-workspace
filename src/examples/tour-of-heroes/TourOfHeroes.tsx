import React from 'react'
import {Router} from '@reach/router'
import {HEROES, Hero} from './mock-heroes'
import {HeroesContext} from './HeroesContext'
import {Dashboard} from './Dashboard'
import {Heroes} from './Heroes'
import {HeroDetails} from './HeroDetails'

export type HeroesActions =
  | {type: 'ADD_HERO'; payload: string}
  | {type: 'REMOVE_HERO'; payload: number}
  | {type: 'UPDATE_HERO'; payload: {id: number; name: string}}

// State reducer
function reducer(state: Hero[], msg: HeroesActions) {
  switch (msg.type) {
    case 'ADD_HERO':
      return [...state, {id: state[state.length - 1].id + 1, name: msg.payload}]
    case 'REMOVE_HERO':
      return state.filter((hero) => hero.id !== msg.payload)
    case 'UPDATE_HERO':
      return state.map((hero) => {
        if (hero.id === Number(msg.payload.id)) return {...hero, name: msg.payload.name}
        return hero
      })
    default:
      return state
  }
}

export const TourOfHeroes: React.FC = () => {
  const value = React.useReducer(reducer, HEROES)

  return (
    <HeroesContext.Provider value={value}>
      <Router>
        <Dashboard path="/" />
        <Heroes path="heroes" />
        <HeroDetails path="heroes/:heroId" />
      </Router>
    </HeroesContext.Provider>
  )
}
