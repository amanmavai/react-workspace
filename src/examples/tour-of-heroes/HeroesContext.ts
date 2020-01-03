import React, {Dispatch} from 'react'
import {Hero} from './mock-heroes'
import {HeroesActions} from './TourOfHeroes'

export type IHeroContext = [Hero[], Dispatch<HeroesActions>]

export const HeroesContext = React.createContext([[], () => {}] as IHeroContext)
