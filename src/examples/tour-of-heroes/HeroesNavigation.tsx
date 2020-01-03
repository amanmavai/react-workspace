import React from 'react'
import {Link} from '@reach/router'
import {Button, Heading} from 'rebass'

export const HeroesNavigation = () => {
  return (
    <div>
      <Heading fontSize={[1, 2, 3]} color="primary" mt={3} mb={3}>
        {'Tour Of Heroes'}
      </Heading>
      <Link to="/">
        <Button
          sx={{
            bg: '#eee',
            mr: 3,
            p: 3,
            color: '#334953',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#CFD8DC',
              cursor: 'pointer',
              color: '#039be5',
            },
          }}
        >
          Dashboard
        </Button>
      </Link>
      <Link to="/heroes">
        <Button
          sx={{
            bg: '#eee',
            mr: 3,
            p: 3,
            color: '#334953',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#CFD8DC',
              cursor: 'pointer',
              color: '#039be5',
            },
          }}
        >
          Heroes
        </Button>
      </Link>
    </div>
  )
}
