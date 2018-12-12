const { useState, useEffect } = require('react')

const updateObject = (props, state) => ({ ...state, ...props })
const neverChange = []

const defineStore = (initialValue, { get, ...rawActions } = {}) => {
  let currentValue = initialValue
  const subscribers = new Set()
  const actions = {}

  actions.use = () => {
    const [value, setValue] = useState(currentValue)
    useEffect(() => {
      subscribers.add(setValue)
      return () => subscribers.delete(setValue)
    }, neverChange)
    return value
  }

  const set = (actions.set = value => {
    if (currentValue === value) return value
    currentValue = value
    for (const sub of subscribers) {
      sub(value)
    }
    return value
  })

  if (rawActions.reset === undefined) {
    rawActions.reset = () => initialValue
  }

  if (currentValue && typeof currentValue === 'object') {
    if (!Array.isArray(currentValue)) {
      if (rawActions.update === undefined) {
        rawActions.update = updateObject
      }
    }
  }

  for (const [key, action] of Object.entries(rawActions)) {
    actions[key] = value => set(action(value, currentValue))
  }

  actions.get = get === undefined ? () => currentValue : () => get(currentValue)

  return actions
}

module.exports = { defineStore }
