// This is the entry point for webpack and the master JS file.
// This will be the first file called when webpack is run

require('webpack-hot-middleware/client'); // Webpack configuration
import '../css/main.css'; // Link main.css.  Any CSS files imported will be applied.



// *** Start Test JS ***
import * as test from './test';


test.test('Testing');

test.test2('test2');
// *** END Test JS ***