/** NOTE - GRAPH QUERY & MUTATION */
export const getNote = noteId => `
{
  note (id: ${noteId}) {
    id,
    title,
    contents,
    sort_value,
    pinned,
    color_id,
    mode,
    status_id,
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
    color_id,
    mode,
    status_id,
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
      str += `${key}: ${element},`
    }
  }

  return `
    mutation {
      createNote(note: {${str}})
    }
  `
}
export const updateNote = (noteId, updatedAttributes) => {
  let str = ''
  for (const key in updatedAttributes) {
    if (updatedAttributes.hasOwnProperty(key)) {
      const element = updatedAttributes[key]
      str += `${key}: ${element},`
    }
  }

  return `
    mutation {
      updateNote(id: ${noteId}, note: {${str}})
    }
  `
}

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
