class ChildRecord {
  static listAll() {
    return [
      {
        id: 'abcd',
        name: 'Ania',
        gift: 'Lalka',
      },
      {
        id: 'aeed',
        name: 'Krzyś',
        gift: 'Samochodzik',
      },
      {
        id: 'aqqd',
        name: 'Piotruś',
        gift: 'Klocki',
      },
    ];
  }
}

module.exports = {
  ChildRecord,
};
