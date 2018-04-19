/** Import external lib */

/** Import internal lib */
import type from '../config/type'
import { maskErrors } from '../graphQLError'
import apiValidation from '../services/api'

/** Import from db and schema */
import models from '../../db/models'

const { Note, Sequelize } = models

/** Definition of model type */
const noteInputType = type.input({
  name: 'NoteInput',
  description: '',
  fields: {
    title: { type: type.string },
    contents: { type: type.string },
    pinned: { type: type.boolean },
    color_id: { type: type.int },
    status_id: { type: type.int },
    remind_at: { type: type.string }
  }
})

export const noteType = type.object({
  name: 'Note',
  fields: {
    id: { type: type.ID },
    title: { type: type.string },
    contents: { type: type.string },
    sort_value: { type: type.int },
    pinned: { type: type.boolean },
    color_id: { type: type.int },
    status_id: { type: type.int },
    remind_at: { type: type.string },
    deleted_at: { type: type.string },
    created_at: { type: type.string },
    updated_at: { type: type.string }
  }
})

/** Resolver */
const resolver = {
  /** Query */
  note: async (obj, args, context, selectionSet) => {
    return await Note.findOne({
      where: { id: args.id },
      attributes: selectionSet.root
    })
  },
  notes: async (obj, args, context, selectionSet) => {
    return await Note.findAll({
      limit: args.limit,
      offset: args.offset,
      attributes: selectionSet.root
    })
  },

  /** Mutation */
  createNote: async (obj, args, context, selectionSet) => {
    const note = Object.assign({}, args.note)
    note.color_id = note.color_id || 0
    note.status_id = note.status_id || 1

    return await Note.create(note)
  },
  updateNote: async (obj, args, context, selectionSet) => {
    const note = Object.assign({}, args.note)
    return await Note.update(note, { where: { id: args.id } })
  },
  deleteNote: async (obj, args, context, selectionSet) => {
    return await Note.destroy({ where: { id: args.id } })
  }
}

/** Schema */
export const noteSchema = {
  query: {
    note: {
      type: noteType,
      args: { id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.note)
    },
    notes: {
      type: type.list(noteType),
      args: { limit: { type: type.int }, offset: { type: type.int } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.notes)
    }
  },
  mutation: {
    createNote: {
      type: noteType,
      description: 'Create note',
      args: { note: { type: noteInputType } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.createNote)
    },
    updateNote: {
      type: type.int,
      description: 'Update note',
      args: { id: { type: type.INT }, note: { type: noteInputType } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.createNote)
    },
    deleteNote: {
      type: noteType,
      description: 'Delete note',
      args: { id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.createNote)
    }
  }
}

const schema = type.schema({
  query: type.object({
    name: 'NoteQuery',
    fields: {
      note: noteSchema.query.note,
      notes: noteSchema.query.notes
    }
  }),
  mutation: type.object({
    name: 'TagMutation',
    fields: {
      createNote: noteSchema.mutation.createNote,
      updateNote: noteSchema.mutation.updateNote,
      deleteNote: noteSchema.mutation.deleteNote
    }
  })
})

maskErrors(schema)

export default schema
