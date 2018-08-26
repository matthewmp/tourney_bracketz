// This is the entry point for webpack and the master JS file.
// This will be the first file called when webpack is run

require('webpack-hot-middleware/client'); // Webpack configuration
import '../css/reset.css'; // Link rest.css.  This "resets" browser specific settings to achieve a common look across browsers
import '../css/bootstrap.min.css'; // Link bootstrap css. Use for grid system & mobile responsiveness
import '../css/main.css'; // Link main.css.  Any CSS files imported will be applied.
import '../css/logos.css';


// *** Start Test JS ***
// This is to check that ES6 import and export is working so that we can include
// JS/CSS modules as needed.
// If the 2 strings below inside test.test log in the console, it is working
import * as test from './test';


test.test('Testing');

test.test2('test2');

// *** END Test JS ***