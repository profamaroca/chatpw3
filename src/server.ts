import "./database";
import express, { request } from "express";
import { routes } from "./routes";


const app = express();

app.use(express.json());
app.use(routes);

const port = 3000

app.get('/', (req, res) => {
  res.send('oi expresssssss')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

