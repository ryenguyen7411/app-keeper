/** Import external lib */

/** Import internal lib */
import type from '../config/type'
import { maskErrors } from '../graphQLError'

/** Import schemas */
import { tagSchema } from './tag'
import { noteSchema } from './note'
import { noteTagSchema } from './note_tag'

/** Schema */
const schema = type.schema({
  query: type.object({
    name: 'RootQuery',
    fields: {
      tag: tagSchema.query.tag,
      tags: tagSchema.query.tags,

      note: noteSchema.query.note,
      notes: noteSchema.query.notes,

      noteTag: noteTagSchema.query.noteTag,
      noteTags: noteTagSchema.query.noteTags
    }
  }),
  mutation: type.object({
    name: 'RootMutation',
    fields: {
      createTag: tagSchema.mutation.createTag,
      updateTag: tagSchema.mutation.updateTag,
      deleteTag: tagSchema.mutation.deleteTag,

      createNote: noteSchema.mutation.createNote,
      updateNote: noteSchema.mutation.updateNote,
      deleteNote: noteSchema.mutation.deleteNote,

      createNoteTag: noteTagSchema.mutation.createNoteTag,
      deleteNoteTag: noteTagSchema.mutation.deleteNoteTag
    }
  })
})

maskErrors(schema)

export default schema
