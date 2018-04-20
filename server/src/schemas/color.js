/** Import external lib */

/** Import internal lib */
import type from '../config/type'
import { maskErrors } from '../graphQLError'
import apiValidation from '../services/api'

/** Import from db and schema */
import models from '../../db/models'

const { Color, Sequelize } = models

/** Definition of model type */
export const colorType = type.object({
  name: 'Color',
  fields: {
    id: { type: type.ID },
    hex: { type: type.string },
    deleted_at: { type: type.string },
    created_at: { type: type.string },
    updated_at: { type: type.string }
  }
})

/** Resolver */
const resolver = {
  /** QUERY */
  color: async (obj, args, context, selectionSet) => {
    return await Color.findOne({
      where: { id: args.id },
      attributes: selectionSet.root
    })
  },
  colors: async (obj, args, context, selectionSet) => {
    return await Color.findAll({
      limit: args.limit,
      offset: args.offset,
      attributes: selectionSet.root
    })
  },

  /** MUTATION */
  createColor: async (obj, args, context, selectionSet) => {
    return await Color.create({ hex: args.hex })
  },
  updateColor: async (obj, args, context, selectionSet) => {
    return await Color.update({ hex: args.hex }, { where: { id: args.id } })
  },
  deleteColor: async (obj, args, context, selectionSet) => {
    return await Color.destroy({ where: { id: args.id } })
  }
}

/** Schema */
export const colorSchema = {
  query: {
    color: {
      type: colorType,
      args: { id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.color)
    },
    colors: {
      type: type.list(colorType),
      args: { limit: { type: type.int }, offset: { type: type.int } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.colors)
    }
  },
  mutation: {
    createColor: {
      type: colorType,
      args: { hex: { type: type.STRING } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.createColor)
    },
    updateColor: {
      type: colorType,
      args: { id: { type: type.INT }, hex: { type: type.STRING } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.updateColor)
    },
    deleteColor: {
      type: colorType,
      args: { id: { type: type.INT } },
      resolve: (obj, args, context, info) =>
        apiValidation({ obj, args, context, info }, resolver.deleteColor)
    }
  }
}

const schema = type.schema({
  query: type.object({
    name: 'ColorQuery',
    fields: {
      color: colorSchema.query.color,
      colors: colorSchema.query.colors
    }
  }),
  mutation: type.object({
    name: 'TagMutation',
    fields: {
      createColor: colorSchema.mutation.createColor,
      updateColor: colorSchema.mutation.updateColor,
      deleteColor: colorSchema.mutation.deleteColor
    }
  })
})

maskErrors(schema)

export default schema
