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
  async CounterCategory() {
    const query =
      "SELECT category, COUNT(category) FROM figurine GROUP BY category;";
    const count = await client.query(query);
    console.log(count.rows);
    return count.rows;
  },
  async getCategoryOfFigurine(element) {
    console.log(element);
    const query = {
      text: "SELECT * FROM figurine WHERE category = $1;",
      values: [element],
    };
    const category = await client.query(query);
    return category.rows;
  },
};

module.exports = dataMapper;
