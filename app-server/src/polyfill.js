import graphqlFields from 'graphql-fields'
import _ from 'lodash'

export const getSelectionSet = (
  info,
  target = undefined,
  include = undefined
) => {
  const selectionSet = target
    ? graphqlFields(info)[target]
    : graphqlFields(info)

  _.merge(selectionSet, include)

  const isEmpty = obj => {
    for (const x in obj) return false
    return true
  }

  const extractSelection = selection => {
    const root = []
    const child = {}

    for (const key in selection) {
      if (selection.hasOwnProperty(key)) {
        const value = selection[key]
        isEmpty(value) ? root.push(key) : (child[key] = extractSelection(value))
      }
    }
    return { root, child }
  }

  return extractSelection(selectionSet)
}
