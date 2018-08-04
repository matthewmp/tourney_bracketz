// This is the entry point for webpack and the master JS file.
// This will be the first file called when webpack is run
require('webpack-hot-middleware/client');

import * as test from './test';
import '../css/main.css';


test.test('Testing');

test.test2('test2');