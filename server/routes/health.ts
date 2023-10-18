const getHealth = (req, res) => {
  res.status(200).json({ OK: "we are _so_ OK." });
};

export default getHealth;
