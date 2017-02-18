const dateFormatter = new global.Intl.DateTimeFormat('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
export const formatDate = (date) => {
  return dateFormatter.format(date)
}
