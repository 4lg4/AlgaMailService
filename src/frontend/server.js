
import express from 'express'
const app = express();

app.use('/', express.static('./dist'));

app.listen(8080, function () {
    console.log('Running on http://localhost:8080')
});
