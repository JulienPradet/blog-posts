const toCssId = str => (str ? str.replace(/ /g, "-").toLowerCase() : "global");

export default toCssId;
