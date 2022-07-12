import express from 'express'

// create express instance that listens on port 4000
const app = express()
app.listen(2022)

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

export const viteNodeApp = app

