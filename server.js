var express = require('express'), app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname));
app.use('/app', express.static(__dirname + '/app'));
app.use('/app', express.static(__dirname + '/app'));

app.get("*", function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
