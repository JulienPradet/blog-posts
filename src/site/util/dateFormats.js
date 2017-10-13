const formatDate = date => {
  const dateFormatter = new global.Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return dateFormatter.format(date);
};

const formatSimpleDate = date => {
  const dateFormatter = new global.Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return dateFormatter.format(date);
};

export { formatDate, formatSimpleDate };
