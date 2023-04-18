
import express from "express";
import "express-async-errors";
import morgan from "morgan"; 

const dotenv = require('dotenv');
dotenv.config(); 

const app = express(); 
const port = process.env.PORT; 

app.use(morgan("dev"))
app.use(express.json())
type Planet = {
    id: number,
    name: string,
  };

  type Planets = Planet[];

  let planets: Planets = [
    {
      id: 1,
      name: "Earth",
    },
    {
      id: 2,
      name: "Mars",
    },
  ];

app.get("/", (req, res)=> {
    res.status(200).json(planets);
    
});

app.listen(port, () => {
    console.log(`example app running on port http://localhost:${port}`);
}); 