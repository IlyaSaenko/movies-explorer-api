const reqLimiter = require('express-rate-limit');

const limiter = reqLimiter({
  max: 160,
  windowMS: 55000,
  message: 'Приносим свои извинения! Превышен лимит запросов. Рекомендуем повторить попытку через пару минут',
});

module.exports = limiter;
