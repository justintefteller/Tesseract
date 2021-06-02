const express = require('express')
const app = express();
app.use(express.static('dist'))

app.get('/', (req, res) => {
    res.sendFile('./dist/index.html')
})

app.listen(3000, () => {
    console.log('listening on port 3000' )
});