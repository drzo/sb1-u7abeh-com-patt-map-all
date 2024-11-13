import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static('src'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'src/dashboard/index.html'));
});

app.listen(port, () => {
  console.log(`Dashboard running at http://localhost:${port}`);
});