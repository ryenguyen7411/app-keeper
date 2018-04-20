/** NOTE - GRAPH QUERY & MUTATION */
export const getNote = noteId => `
{
  note (id: ${noteId}) {
    id,
    title,
    contents,
    sort_value,
    pinned,
    color {
      id
      hex
    },
    mode,
    status {
      id
      name
    },
    remind_at,
    created_at,
    updated_at
  }
}
`
export const getNotes = () => `
{
  notes {
    id,
    title,
    contents,
    sort_value,
    pinned,
    color {
      id
      hex
    },
    mode,
    status {
      id
      name
    },
    remind_at,
    created_at,
    updated_at
  }
}
`
export const createNote = note => {
  let str = ''
  for (const key in note) {
    if (note.hasOwnProperty(key)) {
      const element = note[key]
      str += `${key}: ${
        typeof element === 'string' ? `"${element}"` : element
      },`
    }
  }

  return `
    mutation {
      createNote(note: {${str}}) {
        id,
        title,
        contents,
        sort_value,
        pinned,
        color {
          id
          hex
        },
        mode,
        status {
          id
          name
        },
        remind_at,
        created_at,
        updated_at
      }
    }
  `
}
export const updateNote = (noteId, updatedAttributes) => {
  let str = ''
  for (const key in updatedAttributes) {
    if (updatedAttributes.hasOwnProperty(key)) {
      const element = updatedAttributes[key]
      str += `${key}: ${
        typeof element === 'string' ? `"${element}"` : element
      },`
    }
  }

  return `
    mutation {
      updateNote(id: ${noteId}, note: {${str}})
    }
  `
}
export const deleteNote = noteId => {
  return `
  mutation {
    deleteNote(id: ${noteId})
  }
  `
}

/** TAG - GRAPH QUERY */
export const getTags = () => `
{
  tags {
    id
    title
  }
}
`

/** NOTE TAG - GRAPH QUERY */
export const getNoteTags = () => `
{
  noteTags {
    id
    note_id
    tag {
      id
      title
    }
  }
}
`

/** COLOR - GRAPH QUERY */
export const getColors = () => `
{
  colors {
    id
    hex
  }
}
`
