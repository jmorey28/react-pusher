const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const pusher = new Pusher({
    appId: '969777',
    key: '4aece57e5162943ac969',
    secret: '63bbbf6513502a0c7c33',
    cluster: 'us2',
    encrypted: true
});
app.set('PORT', process.env.PORT || 8080);

app.post('/message', (req, res) => {
    const payload = req.body;
    pusher.trigger('chat', 'message', payload);
    res.send(payload)
});

app.listen(app.get('PORT'), () => 
    console.log('Listening at ' + app.get('PORT')))