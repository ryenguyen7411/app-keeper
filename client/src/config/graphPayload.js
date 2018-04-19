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
