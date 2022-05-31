// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (key, initialValue) => {
  const [value, setValue] = React.useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(key)) ?? initialValue
    } catch (e) {
      return initialValue
    }
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      Greeting:
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function FullNameGreeting(initialUser = {first: '', last: ''}) {
  const [user, setUser] = useLocalStorageState('user', initialUser)

  const handleFirstNameChange = event =>
    setUser({...user, first: event.target.value})
  const handleLastNameChange = event =>
    setUser({...user, last: event.target.value})
  const getFullName = () => user.first + (user.last ? ' ' + user.last : '')

  return (
    <div>
      FullNameGreeting:
      <form>
        <label htmlFor="firstName">First Name: </label>
        <input
          value={user.first}
          onChange={handleFirstNameChange}
          id="firstName"
        />
        <label htmlFor="lastName">Last Name: </label>
        <input
          value={user.last}
          onChange={handleLastNameChange}
          id="lastName"
        />
      </form>
      {user.first ? (
        <strong>Hello {getFullName(user)}</strong>
      ) : (
        'Please type at least your first name'
      )}
    </div>
  )
}

function App() {
  return (
    <>
      <Greeting />
      <FullNameGreeting />
    </>
  )
}

export default App
