const PORT = 8000;
const express = require('express')
const app = express()

app.use(express.static(`${__dirname}/public`));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

