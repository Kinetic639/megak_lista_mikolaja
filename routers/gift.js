const { Router } = require('express');
const { GiftRecord } = require('../records/gift.record');

const giftRouter = Router();

giftRouter.get('/', async (req, res) => {
  const giftsList = await GiftRecord.listAll();
  res.render('gifts/list', {
    giftsList,
  });
});

module.exports = {
  giftRouter,
};
