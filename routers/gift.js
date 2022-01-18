const { Router } = require('express');
const { GiftRecord } = require('../records/gift.record');

const giftRouter = Router();

giftRouter.get('/', (req, res) => {
  const giftsList = GiftRecord.listAll();
  res.render('gifts/list', {
    giftsList,
  });
});

module.exports = {
  giftRouter,
};
