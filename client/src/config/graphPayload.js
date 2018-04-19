export const getNotes = () => `
{
  notes {
    id,
    title,
    contents,
    sort_value,
    pinned,
    color_id,
    status_id,
    remind_at,
    created_at,
    updated_at
  }
}
`
