import React from 'react'
import {RouteComponentProps} from '@reach/router'
import {HeroesNavigation} from './HeroesNavigation'
import {HeroesContext} from './HeroesContext'

interface HeroDetailsProps extends RouteComponentProps {
  heroId?: number
}
export const HeroDetails = (props: HeroDetailsProps) => {
  const [heroes, dispatch] = React.useContext(HeroesContext)
  const {heroId = 11, navigate} = props
  const hero = heroes.find((h) => h.id === Number(heroId))
  const [val, setVal] = React.useState(hero?.name || '')

  if (!hero) {
    return null
  }

  return (
    <>
      <HeroesNavigation />
      <div>
        <h2>{hero.name.toUpperCase()} Details</h2>
        <div>
          <span>id: </span>
          {hero.id}
        </div>
        <div>
          <label>
            name:
            <input placeholder="name" type="text" value={val} onChange={(e) => setVal(e.target.value)} />
          </label>
        </div>
        <button onClick={() => window.history.back()}>go back</button>
        <button
          onClick={() => {
            dispatch({type: 'UPDATE_HERO', payload: {id: heroId, name: val}})
            navigate?.('/')
          }}
        >
          save
        </button>
      </div>
    </>
  )
}
