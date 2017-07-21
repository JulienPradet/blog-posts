module.exports = {
  title: "Autres articles",
  description: `Les articles fourre tout de Julien Pradet. Tout ce que je n'ai pas réussi à caser dans les autres catégories arrive ici !`,
  layout: "Blog",
  isHome: true,
  filter: page => page.category === "Autres"
};
