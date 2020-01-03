import React from 'react'
import {Link, RouteComponentProps} from '@reach/router'
import {Button, Box, Text, Flex, Heading} from 'rebass'
import {HeroesNavigation} from './HeroesNavigation'
import {HeroesContext} from './HeroesContext'

export const Dashboard = (props: RouteComponentProps) => {
  const [heroes] = React.useContext(HeroesContext)
  const topHeroesElements = heroes.slice(0, 4).map((hero, index, arr) => {
    return (
      <Link to={`/heroes/${hero.id}`} style={{textDecoration: 'none'}}>
        <Box
          sx={{
            bg: '#3f525c',
            height: 75,
            width: 83,
            mt: 3,
            ml: 3,
            borderRadius: 2,
            color: '#eee',
            textAlign: 'center',
            p: 3,
            '&:hover': {
              backgroundColor: '#eee',
              cursor: 'pointer',
              color: '#3f525c',
            },
          }}
        >
          <Text
            key={hero.id}
            sx={{
              fontSize: 0,
              fontWeight: 'bold',
              pt: 2,
            }}
          >
            {hero.name}
          </Text>
        </Box>
      </Link>
    )
  })

  const [val, setVal] = React.useState('')
  return (
    <div>
      <HeroesNavigation />
      <Heading
        as="h3"
        sx={{
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontWeight: 'lighter',
          color: '#444',
          fontSize: [1, 2, 3],
          mt: 3,
        }}
      >
        Top Heroes
      </Heading>
      <Flex alignItems={'center'}>{topHeroesElements}</Flex>

      <Text sx={{mt: 3, fontWeight: 'bold', color: '#333', fontSize: 2, mr: 6}}>Hero Search</Text>
      <Box>
        <input type="text" name="search" value={val} onChange={(e) => setVal(e.target.value)} />
        <Button
          variant="primary"
          ml={2}
          p={2}
          css={{color: 'white', cursor: 'pointer'}}
          onClick={() => {
            setVal('')
          }}
        >
          Search
        </Button>
      </Box>
    </div>
  )
}
