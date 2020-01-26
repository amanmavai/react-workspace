import * as React from 'react'
interface Props {
  o: any
}
export const Debug: React.SFC<Props> = ({o}) => {
  return (
    <div
      style={{margin: '3rem 0', borderRadius: 4, background: '#f6f8fa', boxShadow: '0 0 1px #eee inset', color: 'blue'}}
    >
      <div
        style={{
          fontSize: 11,
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          fontWeight: 500,
          padding: '.5rem',
          background: '#555',
          color: '#fff',
          letterSpacing: '1px',
        }}
      >
        STATE
        <pre
          style={{
            fontSize: '.65rem',
            padding: '.25rem .5rem',
          }}
        >
          {JSON.stringify(o, null, 2)}
        </pre>
      </div>
    </div>
  )
}
