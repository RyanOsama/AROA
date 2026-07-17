const fs = require('fs');
try {
  fs.renameSync('d:/AROA/store/public/logo/لوقو نقوة.jpg', 'd:/AROA/store/public/logo/logo.png');
  console.log('Renamed successfully');
} catch(e) {
  console.log(e);
}
