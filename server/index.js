import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(404).send("Not found");
})

app.listen(PORT, () => {
  console.log(`Server with Database is listening on http://localhost:${PORT}`);
});