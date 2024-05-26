const express = require('express');
import router from'./routes';

const app = express();
const port = 1245;

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
