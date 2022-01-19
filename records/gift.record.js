const { pool } = require('../utils/db');
const { ValidationError } = require('../utils/errors');
const { v4: uuid } = require('uuid');

class GiftRecord {
  constructor(obj) {
    if (!obj.name || obj.name.length < 3 || obj.name.length > 55) {
      throw new ValidationError(
        'Nazwa prezentu musi mieć od 3 do 55 znaków...',
      );
    }

    if (!obj.count || obj.count < 1 || obj.count > 999999) {
      throw new ValidationError(
        'Liczba sztuk musi mieścić się w przedziale od 1 do 999999...',
      );
    }

    this.id = obj.id;
    this.name = obj.name;
    this.count = obj.count;
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    }

    await pool.execute('INSERT INTO `gifts` VALUES(:id,:name, :count)', {
      id: this.id,
      name: this.name,
      count: this.count,
    });

    return this.id;
  }

  static async listAll() {
    const [result] = await pool.execute('SELECT * FROM `gifts`');
    return result;
  }
}

module.exports = {
  GiftRecord,
};
