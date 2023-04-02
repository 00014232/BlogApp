const express = require('express')
const app = express()
const path = require('path')
const PORT = 9000;
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('views', './views');
app.set('view engine', 'ejs');
app.use('', require('./routes/articleRoutes'))

app.listen(PORT, function() {
	console.log('server is listening to port-' + PORT);
});

