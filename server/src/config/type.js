import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLSchema,
  GraphQLString,
  GraphQLUnionType
} from 'graphql'

const schemaType = {
  boolean: GraphQLBoolean,
  enum: GraphQLEnumType,
  float: GraphQLFloat,
  id: GraphQLID,
  input: T => new GraphQLInputObjectType(T),
  int: GraphQLInt,
  interface: GraphQLInterfaceType,
  list: T => new GraphQLList(T),
  object: T => new GraphQLObjectType(T),
  scalar: GraphQLScalarType,
  schema: T => new GraphQLSchema(T),
  string: GraphQLString,
  union: GraphQLUnionType,

  BOOLEAN: new GraphQLNonNull(GraphQLBoolean),
  FLOAT: new GraphQLNonNull(GraphQLFloat),
  ID: new GraphQLNonNull(GraphQLID),
  INT: new GraphQLNonNull(GraphQLInt),
  STRING: new GraphQLNonNull(GraphQLString)
}

export default schemaType
