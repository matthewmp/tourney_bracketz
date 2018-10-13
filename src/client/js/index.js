// This is the entry point for webpack and the master JS file.
// This will be the first file called when webpack is run

require('webpack-hot-middleware/client'); // Webpack configuration
import '../css/reset.css'; // Link rest.css.  This "resets" browser specific settings to achieve a common look across browsers
import '../css/bootstrap.min.css'; // Link bootstrap css. Use for grid system & mobile responsiveness
import '../css/main.css'; // Link main.css.  Any CSS files imported will be applied.
import '../css/logos.css';
import '../css/test_bracket.css';
import '../css/signin.css';
import '../css/messenger.css';
import '../css/nav_bar.css';
import './view.js';
import './signin.js';
