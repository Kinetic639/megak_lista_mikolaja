class GiftRecord {
  static listAll() {
    return [
      {
        id: 'abc1',
        name: 'Domek dla lalek',
        count: 5,
      },
      {
        id: 'abd2',
        name: 'Samochodzik',
        count: 4,
      },
      {
        id: 'abf3',
        name: 'Klocki',
        count: 2,
      },
    ];
  }
}

module.exports = {
  GiftRecord,
};
