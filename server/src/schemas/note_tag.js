/** Import external lib */
import _ from 'lodash'

/** Import internal lib */
import type from '../config/type'
import { maskErrors } from '../graphQLError'
import apiValidation from '../services/api'

/** Import from db and schema */
import models from '../../db/models'
import { tagType } from './tag'
import { noteType } from './note'

const { NoteTag, Note, Tag, Sequelize } = models

/** Definition of model type */
export const noteTagType = type.object({
  name: 'NoteTag',
  fields: {
    id: { type: type.ID },
    note_id: { type: type.int },
    note: { type: noteType },
    tag_id: { type: type.int },
    tag: { type: tagType },
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
      where: { note_id: args.id },
      attributes: selectionSet.root,
      include: [
        {
          model: Note,
          as: 'note',
          attributes: _.get(selectionSet, ['child', 'note', 'root'], [])
        },
        {
          model: Tag,
          as: 'tag',
          attributes: _.get(selectionSet, ['child', 'tag', 'root'], [])
        }
      ]
    })
  },
  noteTags: async (obj, args, context, selectionSet) => {
    return await NoteTag.findAll({
      limit: args.limit,
      offset: args.offset,
      attributes: selectionSet.root,
      order: ['note_id'],
      include: [
        {
          model: Note,
          as: 'note',
          attributes: _.get(selectionSet, ['child', 'note', 'root'], [])
        },
        {
          model: Tag,
          as: 'tag',
          attributes: _.get(selectionSet, ['child', 'tag', 'root'], [])
        }
      ]
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
