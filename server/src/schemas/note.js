/** Import external lib */
import _ from 'lodash'

/** Import internal lib */
import type from '../config/type'
import { maskErrors } from '../graphQLError'
import apiValidation from '../services/api'

/** Import from db and schema */
import models from '../../db/models'
import { colorType } from './color'

const { Note, Color, Tag, Image, Status, Sequelize } = models

/** Definition of model type */
const imageType = type.object({
  name: 'Image',
  fields: {
    id: { type: type.INT },
    note_id: { type: type.int },
    url: { type: type.string },
    deleted_at: { type: type.string },
    created_at: { type: type.string },
    updated_at: { type: type.string }
  }
})

const statusType = type.object({
  name: 'Status',
  fields: {
    id: { type: type.INT },
    name: { type: type.string },
    deleted_at: { type: type.string },
    created_at: { type: type.string },
    updated_at: { type: type.string }
  }
})

const noteInputType = type.input({
  name: 'NoteInput',
  fields: {
    title: { type: type.string },
    contents: { type: type.string },
    pinned: { type: type.boolean },
    color_id: { type: type.int },
    mode: { type: type.string },
    status_id: { type: type.int },
    remind_at: { type: type.string }
  }
})

export const noteType = type.object({
  name: 'Note',
  fields: {
    id: { type: type.INT },
    title: { type: type.string },
    contents: { type: type.string },
    sort_value: { type: type.int },
    pinned: { type: type.boolean },
    color_id: { type: type.int },
    color: { type: colorType },
    mode: { type: type.string },
    image: { type: imageType },
    status_id: { type: type.int },
    status: { type: statusType },
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
      attributes: selectionSet.root,
      include: [
        {
          model: Color,
          as: 'color',
          attributes: _.get(selectionSet, ['child', 'color', 'root'], [])
        },
        {
          model: Status,
          as: 'status',
          attributes: _.get(selectionSet, ['child', 'status', 'root'], [])
        }
      ]
    })
  },
  notes: async (obj, args, context, selectionSet) => {
    return await Note.findAll({
      limit: args.limit,
      offset: args.offset,
      attributes: selectionSet.root,
      include: [
        {
          model: Color,
          as: 'color',
          attributes: _.get(selectionSet, ['child', 'color', 'root'], [])
        },
        {
          model: Status,
          as: 'status',
          attributes: _.get(selectionSet, ['child', 'status', 'root'], [])
        }
      ]
    })
  },

  /** Mutation */
  createNote: async (obj, args, context, selectionSet) => {
    const note = Object.assign({}, args.note)
    note.color_id = note.color_id || 1
    note.status_id = note.status_id || 1

    return await Note.create(note)
  },
  updateNote: async (obj, args, context, selectionSet) => {
    const note = Object.assign({}, args.note)
    if (note.status_id !== 1) {
      note.pinned = false
    }

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
        apiValidation({ obj, args, context, info }, resolver.updateNote)
    },
    deleteNote: {
      type: type.int,
      description: 'Delete note',
      args: { id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.deleteNote)
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
