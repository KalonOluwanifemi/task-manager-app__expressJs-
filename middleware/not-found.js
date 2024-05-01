const notFound = (req, res) =>
  res.status(404).json("The resource you are requesting cannot found");

module.exports = notFound;
