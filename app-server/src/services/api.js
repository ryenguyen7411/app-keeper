import { getSelectionSet } from '../polyfill'
import ERR from '../config/err'
import { ROLE } from '../config/static'

import models from '../../db/models'
const { Role } = models

/** AUTHENTICATION AND AUTHORIZATION */
const authenticated = async context => {
  if (!context.user || !context.session) {
    throw new Error(ERR.stringify(ERR.UNAUTHENTICATED))
  }

  return true
}

const authorized = async (context, role_name) => {
  const role = await Role.findOne({ where: { name: role_name } })

  if (!role) {
    throw new Error(ERR.stringify(ERR.INVALID_ROLE))
  }

  if ((context.user.role_value & role.value) === 0) {
    throw new Error(ERR.stringify(ERR.UNAUTHORIZED))
  }

  return true
}

/** API VALIDATION */
const apiValidation = ({ obj, args, context, info }, func, validObj) => {
  const validation = Object.assign(
    { needAuthenticate: false, needAuthorize: false, role: ROLE.USER },
    validObj
  )

  if (validation.needAuthenticate) {
    authenticated(context)
  }

  if (validation.needAuthorize) {
    authorized(context, validation.role)
  }

  const selectionSet = getSelectionSet(
    info,
    validation.target,
    validation.include
  )
  return func(obj, args, context, selectionSet)
}

export default apiValidation
