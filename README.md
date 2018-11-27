# define-store

React hook for global state management.

> This package is a light replacement to redux.
> You can define global state and actions for your application.

## Install

```bash
npm i define-store
```

## Usage

```js
// in state.js
import { defineStore } from 'define-store'

export const messageState = defineStore('kikou', {
  // is the initial value
  dashJoin: (value, arg) => `${value}-${arg}` // declare actions
})
```

You may import your globals in your application

All states expose a `React Hook`™ to use their state.

```js
import { messageState } from './state.js'

const MyApp = () => {
  const message = messageState.use()

  return <div>{message}</div>
}
```

All states have a `get` method to get their values outside of a component

> You should use the hook inside components or passe the value as props !

```js
import { messageState } from './state.js'

// use your method
messageState.dashJoin('jo')
messageState.get() // = 'kikou-jo'

// and again !
messageState.dashJoin('li')
messageState.get() // = 'kikou-jo-li'
```

All states have a `set` method to replace their values

```js
messageState.set('hello')
messageState.get() // = 'hello'
```

They also have a `reset` method, setting the value to the initial value

```js
messageState.reset()
messageState.get() // = 'kikou'
```

You can store anything you want as data.  
Classic JS `Object`'s are what we will use the most

```js
// state.js
export const messageState = defineStore({
    content: 'kikou',
    type: 'info'
  },
  // DO NOT DO:
  setType: (type, value) => {
    value.type = type // modify the object
    return value // returning the same object, will not trigger an update.
  }
  // Instead we do:
  setType: (type, value) => ({ ...value, type }),
  // All your actions must return a new value or the change will be ignored.
}
```

Now because we always have to do this kind of actions, objects have an
additional `update` action

```js
messageState.setType('warning')
messageState.get() // = { content: 'kikou', type: 'warning' }

messageState.update({ type: 'error' })
messageState.get() // = { content: 'kikou', type: 'error' }
```

That's about it for the state, you can override any predefined
actions with your own.
