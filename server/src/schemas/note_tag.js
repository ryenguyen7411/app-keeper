/** Import external lib */

/** Import internal lib */
import type from '../config/type'
import { maskErrors } from '../graphQLError'
import apiValidation from '../services/api'

/** Import from db and schema */
import models from '../../db/models'

const { NoteTag, Sequelize } = models

/** Definition of model type */
export const noteTagType = type.object({
  name: 'NoteTag',
  fields: {
    id: { type: type.ID },
    note_id: { type: type.int },
    tag_id: { type: type.int },
    deleted_at: { type: type.string },
    created_at: { type: type.string },
    updated_at: { type: type.string }
  }
})

/** Resolver */
const resolver = {
  /** Query */
  noteTag: async (obj, args, context, selectionSet) => {
    return await NoteTag.findOne({
      where: { id: args.id },
      attributes: selectionSet.root
    })
  },
  noteTags: async (obj, args, context, selectionSet) => {
    return await NoteTag.findAll({
      limit: args.limit,
      offset: args.offset,
      attributes: selectionSet.root
    })
  },

  /** Mutation */
  createNoteTag: async (obj, args, context, selectionSet) => {
    const noteTag = Object.create({}, args)
    return await NoteTag.create(noteTag)
  },
  deleteNoteTag: async (obj, args, context, selectionSet) => {
    return await NoteTag.destroy({
      where: { note_id: args.note_id, tag_id: args.tag_id }
    })
  }
}

/** Schema */
export const noteTagSchema = {
  query: {
    noteTag: {
      type: noteTagType,
      args: { id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.noteTag)
    },
    noteTags: {
      type: type.list(noteTagType),
      args: { limit: { type: type.int }, offset: { type: type.int } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.noteTags)
    }
  },
  mutation: {
    createNoteTag: {
      type: noteTagType,
      args: { note_id: { type: type.INT }, tag_id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.createNoteTag)
    },
    deleteNoteTag: {
      type: noteTagType,
      args: { note_id: { type: type.INT }, tag_id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.createNoteTag)
    }
  }
}

const schema = type.schema({
  query: type.object({
    name: 'NoteTagQuery',
    fields: {
      noteTag: noteTagSchema.query.noteTag,
      noteTags: noteTagSchema.query.noteTags
    }
  }),
  mutation: type.object({
    name: 'TagMutation',
    fields: {
      createNoteTag: noteTagSchema.mutation.createNoteTag,
      deleteNoteTag: noteTagSchema.mutation.deleteNoteTag
    }
  })
})

maskErrors(schema)

export default schema
