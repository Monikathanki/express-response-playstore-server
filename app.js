let express = require('express');
let morgan = require('morgan');
let cors = require('cors');

let app = express();

app.use(cors());

app.use(morgan('common'));
let apps = require("./app-data.js");

app.get('/apps', (req, res) => {
    let { sort, genre } = req.query;
    if (sort) {
        if (!['Rating', 'App'].includes(sort)
        ) {
            return res
                .status(400)
                .send('sort must be one of rating or app');
        }
   
    }
    let results = genre
        ? apps.filter(app =>
            app
                .Genres
                .includes(genre))
        : apps;
    if (sort === 'App') {
        results.sort((a, b) => {
            let appA = a.App.toLowerCase();
            let appB = b.App.toLowerCase();
            return
            appA[sort] > appB[sort] ? 1 : appA[sort] < appB[sort] ? -1 : 0;
            
        });
    
    }
    if (sort === 'Rating') {
        results.sort((a, b) => {
            return b.Rating - a.Rating
        });
    }
            

    res
        .json(results);
});

module.exports = app;


//app.listen(8000, () => {
   // console.log('server started on PORT 8000')
//})