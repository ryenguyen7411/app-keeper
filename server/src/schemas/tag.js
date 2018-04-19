/** Import external lib */

/** Import internal lib */
import type from '../config/type'
import { maskErrors } from '../graphQLError'
import apiValidation from '../services/api'

/** Import from db and schema */
import models from '../../db/models'

const { Tag } = models

/** Definition of model type */
export const tagType = type.object({
  name: 'Tag',
  fields: {
    id: { type: type.ID },
    title: { type: type.string },
    deleted_at: { type: type.string },
    created_at: { type: type.string },
    updated_at: { type: type.string }
  }
})

/** Resolver */
const resolver = {
  /** Query */
  tag: async (obj, args, context, selectionSet) => {
    return await Tag.findOne({
      where: { id: args.id },
      attributes: selectionSet.root
    })
  },
  tags: async (obj, args, context, selectionSet) => {
    return await Tag.findAll({
      limit: args.limit,
      offset: args.offset,
      attributes: selectionSet.root
    })
  },

  /** Mutation */
  createTag: async (obj, args, context, selectionSet) => {
    return await Tag.create({ title: args.title })
  },
  updateTag: async (obj, args, context, selectionSet) => {
    return await Tag.update({ title: args.title }, { where: { id: args.id } })
  },
  deleteTag: async (obj, args, context, selectionSet) => {
    // TODO: Delete associate NoteTag
    return await Tag.destroy({ where: { id: args.id } })
  }
}

/** Schema */
export const tagSchema = {
  query: {
    tag: {
      type: tagType,
      args: { id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.tag)
    },
    tags: {
      type: type.list(tagType),
      args: { limit: { type: type.int }, offset: { type: type.int } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.tags)
    }
  },
  mutation: {
    createTag: {
      type: tagType,
      args: { title: { type: type.STRING } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.createTag)
    },
    updateTag: {
      type: type.int,
      args: { id: { type: type.INT }, title: { type: type.STRING } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.updateTag)
    },
    deleteTag: {
      type: type.int,
      args: { id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.deleteTag)
    }
  }
}

const schema = type.schema({
  query: type.object({
    name: 'TagQuery',
    fields: {
      tag: tagSchema.query.tag,
      tags: tagSchema.query.tags
    }
  }),
  mutation: type.object({
    name: 'TagMutation',
    fields: {
      createTag: tagSchema.mutation.createTag,
      updateTag: tagSchema.mutation.updateTag,
      deleteTag: tagSchema.mutation.deleteTag
    }
  })
})

maskErrors(schema)

export default schema
