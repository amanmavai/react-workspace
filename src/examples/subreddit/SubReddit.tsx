import React from 'react'
import {useMachine} from '@xstate/react'
import {Machine, assign, MachineConfig} from 'xstate'

function invokeFetchSubreddit(context: SubRedditContext) {
  const {subreddit} = context

  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((response) => response.json())
    .then((json) => json.data.children.map((child: any) => child.data))
}

// The hierarchical (recursive) schema for the states
interface SubRedditStateSchema {
  states: {
    idle: {}
    selected: {
      states: {
        loading: {}
        loaded: {}
        failed: {}
      }
    }
  }
}

// The events that the machine handles
type SubRedditEvent = {type: 'SELECT'; name: string}

type Post = {title: string}
// The context (extended state) of the machine
interface SubRedditContext {
  subreddit: string
  posts: Post[]
}

const subRedditMachineConfig: MachineConfig<SubRedditContext, SubRedditStateSchema, SubRedditEvent> = {
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: 'default', // none selected
    posts: [],
  },
  states: {
    idle: {},
    selected: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetch-subreddit',
            src: invokeFetchSubreddit,
            onDone: {
              target: 'loaded',
              actions: assign({
                posts: (_context, event) => event.data,
              }),
            },
            onError: 'failed',
          },
        },
        loaded: {},
        failed: {},
      },
    },
  },
  on: {
    SELECT: {
      target: '.selected',
      actions: assign({
        subreddit: (_context, event) => event.name,
      }),
    },
  },
}

const redditMachine = Machine(subRedditMachineConfig)

const subreddits = ['frontend', 'reactjs', 'vuejs']

export const SubReddit = () => {
  const [current, send] = useMachine(redditMachine)
  const {subreddit, posts} = current.context

  return (
    <main>
      <header>
        <select
          onChange={(e) => {
            send('SELECT', {name: e.target.value})
          }}
        >
          {subreddits.map((subreddit) => {
            return <option key={subreddit}>{subreddit}</option>
          })}
        </select>
      </header>
      <section>
        <h1>{current.matches('idle') ? 'Select a subreddit' : subreddit}</h1>
        {current.matches({selected: 'loading'}) && <div>Loading...</div>}
        {current.matches({selected: 'loaded'}) && (
          <ul>
            {posts.map((post) => (
              <li key={post.title}>{post.title}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
