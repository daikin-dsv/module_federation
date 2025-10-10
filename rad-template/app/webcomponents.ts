// These need to be imported here to avoid FOUC on app load
import '@daikin-oss/design-system-web-components/components/breadcrumb-item/index.js';
import '@daikin-oss/design-system-web-components/components/breadcrumb/index.js';
import '@daikin-oss/design-system-web-components/components/button/index.js';
// Reintroduce this after patch fix
// import '@daikin-oss/design-system-web-components/components/loading/index.js';

// Will need to re-implement module federation on vercel
import 'layout/components/Footer';
import 'layout/components/Header';
import 'layout/components/User';
