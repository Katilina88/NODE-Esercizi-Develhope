import express from "express";
import "express-async-errors";
import morgan from "morgan";
import Joi from "joi";

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan("dev"));
app.use(express.json());

interface Planet {
  id: number;
  name: string;
}

let planets: Planet[] = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

app.get("/", (req, res) => {
  res.status(200).json(planets);
});

app.get('/api/planets', (req, res) => {
  res.status(200).json(planets);
});

app.get('/api/planets/:id', (req, res) => {
  const { id } = req.params;
  const planet = planets.find(p => p.id === Number(id));
  res.status(200).json(planet);
});

const schema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

app.post('/api/planets', (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  const validatedPlanet = schema.validate(newPlanet);
  if (validatedPlanet.error) {
    return res.status(400).json({ msg: validatedPlanet.error });
  } else {
    planets.push(newPlanet);
    res.status(201).json({ msg: 'The planet was created' });
  }
});

app.put('/api/planets/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  planets.forEach(p => {
    if (p.id === Number(id)) {
      p.name = name;
    }
  });
  res.status(200).json({ msg: "The planet was updated" });
});

app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;

  planets = planets.filter((planet) => planet.id !== Number(id));
  res.status(200).json({ msg: `Planet ${id} deleted` });
});

app.listen(port, () => {
  console.log(`example app running on port http://localhost:${port}`);
});
