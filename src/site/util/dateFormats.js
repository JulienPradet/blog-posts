const formatDate = (date, lang = "fr-FR") => {
  const dateFormatter = new global.Intl.DateTimeFormat(lang, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return dateFormatter.format(date);
};

const formatSimpleDate = (date, lang = "fr-FR") => {
  const dateFormatter = new global.Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "short"
  });
  return dateFormatter.format(date);
};

export { formatDate, formatSimpleDate };
