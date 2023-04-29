import express from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";
import { getAll, getOneById, create, updateById, deleteById } from "./controllers/planets"; 

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());



app.get('/api/planets', getAll ); 

app.get('/api/planets/:id', getOneById);


app.post('/api/planets',create );

app.put('/api/planets/:id', updateById );

app.delete("/api/planets/:id", deleteById  );

app.listen(port, () => {
  console.log(`example app running on port http://localhost:${port}`);
});
