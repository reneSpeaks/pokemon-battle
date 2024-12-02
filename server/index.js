import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import "./db.js";
import usersRouter from "./routes/users.js";
import rostersRouter from "./routes/rosters.js";
import leaderboardsRouter from "./routes/leaderboards.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use("/users", usersRouter);
app.use("/rosters", rostersRouter);
app.use("/leaderboards", leaderboardsRouter);

app.get('/', (req, res) => {
  res.status(404).send("Not found");
})

app.listen(PORT, () => {
  console.log(`Server with Database is listening on http://localhost:${PORT}`);
});