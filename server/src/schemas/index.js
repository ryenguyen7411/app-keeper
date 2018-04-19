/** Import external lib */

/** Import internal lib */
import type from '../config/type'
import { maskErrors } from '../graphQLError'

/** Import schemas */
import tagSchema from './tag'

/** Schema */
const schema = type.schema({
  query: type.object({
    name: 'RootQuery',
    fields: {
      tag: tagSchema.query.tag,
      tags: tagSchema.query.tags
    }
  }),
  mutation: type.objecy({
    name: 'RootMutation',
    fields: {
      createTag: tagSchema.mutation.createTag,
      updateTag: tagSchema.mutation.updateTag,
      deleteTag: tagSchema.mutation.deleteTag
    }
  })
})

maskErrors(schema)

export default schema
