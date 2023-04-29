import { Request, Response } from "express"; 
import Joi from "joi";

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
const schema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
  });
const getAll = (req: Request, res: Response) => {
    res.status(200).json(planets);
};
const getOneById = (req: Request, res: Response) => {
    const { id } = req.params;
    const planet = planets.find(p => p.id === Number(id));
    res.status(200).json(planet);
}

const create = (req: Request, res: Response) => {
    const { id, name } = req.body;
    const newPlanet: Planet = { id, name };

    planets = [...planets, newPlanet];
    res.status(201).json({ msg: 'The planet was created' });
}

const updateById = (req: Request, res: Response) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    const validatedPlanet = schema.validate(newPlanet);
    if (validatedPlanet.error) {
        return res.status(400).json({ msg: validatedPlanet.error });
    } else {
        planets.push(newPlanet);
        res.status(201).json({ msg: 'The planet was created' });
    }
}


const deleteById = (req: Request, res: Response)=> {
    const { id } = req.params;

    planets = planets.filter((p) => p.id !== Number(id));
    res.status(200).json({ msg: `Planet ${id} deleted` });
}

export {
    getAll, getOneById, create, updateById, deleteById
}