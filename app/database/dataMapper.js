const client = require("./client");

const dataMapper = {
  async getAllFigurines() {
    const query = "SELECT * FROM figurine";
    const figurines = await client.query(query);
    return figurines.rows;
  },
  async getOneFigurine(id) {
    const query = {
      text: `SELECT * FROM figurine WHERE id = $1;`,
      values: [id],
    };
    const figurine = await client.query(query);
    return figurine.rows[0];
  },
};

module.exports = dataMapper;
