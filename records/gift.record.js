const { pool } = require('../utils/db');

class GiftRecord {
  static async listAll() {
    const [result] = await pool.execute('SELECT * FROM `gifts`');
    return result;
  }
}

module.exports = {
  GiftRecord,
};
