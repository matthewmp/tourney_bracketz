const express = require('express');
const path = require('path');

const app = express();

// *** Start Webpack configuration ***
/**/ const webpack = require('webpack');
/**/ const config = require('../../webpack.config.js');
/**/ const compiler = webpack(config);
/**/ const webpackDevMiddleware = 
/**/ require('webpack-dev-middleware')(
/**/ compiler,
/**/ config.devServer
/**/ );
/**/ 
/**/ const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
/**/ 
/**/ app.use(webpackDevMiddleware);
/**/ app.use(webpackHotMiddleware);
// *** END Webpack configuration ***

// Serve Static Files
const staticMiddleware = express.static(path.resolve(__dirname, "../../dist"));
//app.use(staticMiddleware);

//Template engine for non-static files
app.set('view engine', 'pug');

// Indicate to pug that the view layer files are in the views directory
app.set('views', path.join(__dirname, '../views'));

// Setup up routes here
app.get('/', (req, res) => {
	console.log('index requested');

	res.render('index', { 
		title: "Tournament 123", 
		winner: "Tom"
	});
})

app.get('/userdashboard', (req, res) => {
	console.log('userdashboard requested');
	res.render('userdashboard', { 
		title: "Tournament 123", 
		winner: "Tom"
	});
})


// Start Server
app.listen(8888, () => {
	console.log('Listening on 8888');
});
