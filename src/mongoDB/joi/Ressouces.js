import Joi from 'joi';

const nomRessouce = Joi.string().regex(/^\W*\w+(?:\W+\w+)*\W*$/).max(240).required().label("nomRessouce"); //accept string containing character, commas,space, digit up to 240 characters
const    urlRessouce = Joi.string().regex(/^\W*\w+(?:\W+\w+)*\W*$/).max(240).required().label("urlRessouce"); //accept string containing character, commas,space, digit up to 240 characters
const    dateRessource = Joi.string().regex(/^\W*\w+(?:\W+\w+)*\W*$/).max(240).required().label("dateRessource"); //accept string containing character, commas,space, digit up to 240 characters
const    PrositId =  Joi.string();
const    classeId = Joi.string();

export const addRessource = Joi.object().keys({
    nomRessouce,
    urlRessouce,
    dateRessource,
    PrositId,
    classeId
   
})
