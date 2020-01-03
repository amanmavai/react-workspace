import React from 'react'
import {Link, RouteComponentProps} from '@reach/router'
import {Button, Box, Text, Flex, Heading} from 'rebass'
import {HeroesNavigation} from './HeroesNavigation'
import {HeroesContext} from './HeroesContext'

export const Heroes = (props: RouteComponentProps) => {
  const [heroes, dispatch] = React.useContext(HeroesContext)

  const heroesElement = heroes.map((hero) => {
    return (
      <Flex alignItems="center" ml={20}>
        <Text sx={{color: '#607D8B', bg: '#ddd', p: 2}}>{hero.id}</Text>
        <Link to={`/heroes/${hero.id}`} key={hero.id} style={{textDecoration: 'none'}}>
          <Text
            sx={{
              bg: '#607D8B',
              fontSize: [1, 2, 3],
              fontWeight: 'bold',
              color: 'white',
              mt: 1,
              p: 2,
              cursor: 'pointer',
            }}
          >
            {hero.name}
          </Text>
        </Link>
        <Button sx={{cursor: 'pointer', p: 2}} onClick={() => dispatch({type: 'REMOVE_HERO', payload: hero.id})}>
          X
        </Button>
      </Flex>
    )
  })

  const [heroName, setHeroName] = React.useState('')
  return (
    <>
      <HeroesNavigation />
      <Heading as="h2" sx={{mt: 2, fontWeight: 'body'}}>
        My Heroes
      </Heading>
      <Flex alignItems="center" mt={3}>
        <Text mr={1}>Hero name:</Text>
        <input type="text" name="hero_name" value={heroName} onChange={(e) => setHeroName(e.target.value)} />
        <Button
          variant="primary"
          onClick={(e) => {
            dispatch({type: 'ADD_HERO', payload: heroName})
            setHeroName('')
          }}
          ml={3}
          p={2}
          sx={{cursor: 'pointer'}}
        >
          Add
        </Button>
      </Flex>
      <Box sx={{color: 'yellow', m: 2, p: 2}}>{heroesElement}</Box>
    </>
  )
}
