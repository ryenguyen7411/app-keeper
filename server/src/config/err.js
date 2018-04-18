const err = {
  /** COMMON ERROR */
  UNKNOWN: {
    code: -1,
    message: 'Unexpected error.'
  },
  UNAUTHENTICATED: {
    code: -2,
    message: 'User is unauthenticated!'
  },
  UNAUTHORIZED: {
    code: -2,
    message: 'User is unauthorized!'
  },
  INVALID_ROLE: {
    code: -3,
    message: 'Invalid role!'
  },

  /**  */
  SESSION_EXPIRED: {
    code: -100,
    message: 'Session was expired. Please login again.'
  },
  INVALID_USER_PASSWORD: {
    code: -101,
    message: 'Username or password not found.'
  },

  INVALID_ORDER_INFO: {
    code: -201,
    message: 'Neither user nor order info was provided. Please check your information.'
  },
  INVALID_PROMOTION_CODE: {
    code: -202,
    message: 'Your provided promotion code is invalid. Please check your information.'
  },

  /** STRINGIFY ERROR */
  stringify: ({ code, message }) => `${message} [${code}]`
}

export default err
