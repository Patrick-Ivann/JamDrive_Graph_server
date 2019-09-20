import Joi from 'joi';


export const addRessource =  Joi.object().keys({
     // Nom du prosit
     nomProsit: Joi.string().alphanum().min(5).max(55).required().label("Nom du Prosit"),

     // ID de la classe
     classeId: Joi.string().alphanum().min(5).max(55).required(),
 
     // Unité d'enseignement (X-unite)
     unite: Joi.string().alphanum().min(5).max(55).required().label("Unité d'enseignement"),
 
     // Si le prosit est validé par un tuteur
     // 0 -> non validé
     // 1 -> validé par la classe
     // 2 -> validé par un tuteur
     validation: Joi.number().integer().default(0),
 
     // Si le prosit est un ALLER ou un RETOUR
     // FALSE -> ALLER
     // TRUE -> RETOUR
     type: Joi.boolean().required().label("Type de prosit"),
 
     // Nom de la personne ayant le rôle de scribe
     nomScribe: Joi.string().alphanum().min(5).max(55).required().label("Nom du Scribe"),
 
     // Année du prosit
     annee: Joi.string().alphanum().min(4).max(15).required(),
 
     // Mots-clés du prosit
     motsClef: Joi.array().items(Joi.string().alphanum().min(4).max(15)),
    
  
});

