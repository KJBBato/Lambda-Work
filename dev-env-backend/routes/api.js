const router = require('express').router

router.get('/questions/get/all', (res, req, next) => {
  console.log('get all questions')
  res.locals.connection.connect()
  const sql = 'SELECT * FROM Question'
  res.locals.connection.query(sql, (err, results, fields) => {
    res.send(JSON.Stringify(results))
  })
  res.locals.connection.end
})

module.exports = router