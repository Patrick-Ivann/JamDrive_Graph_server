import {
    UserInputError
} from "apollo-server-core";

/**
 * 
 * @param {String} filename 
 * @param {Object} validationError 
 * @returns {{validationError: Boolean, returned: Boolean}}  
 */
export const isValideRessourceName = (filename, validationError) => {
    validationError.formatUnite = "Le titre du document ne respecte pas les convention XX_ressources_nom_eleve.docx."

    return (/^(\d{1,2})(_)(ressources)(_)(\w+)(_)(\w+)(_)(\w+)/.test(filename)) ? {
        validationError: validationError,
        returned: true

    } : {
        validationError: validationError,
        returned: false
    };
}

/**
 * 
 * @param {String} filename 
 * @returns {{ nomRessource:String}} obj
 */
export const extractVariableFromFileName = filename => {
    return {
        nomRessource: filename.split("_")[3]
    }

}