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
  async getOneReview(figurine_id) {
    const query = {
      text: "SELECT * FROM review WHERE figurine_id = $1;",
      values: [figurine_id],
    };
    const review = await client.query(query);
    return review.rows;
  },
};

module.exports = dataMapper;
