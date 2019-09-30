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
    validationError.formatUnite = "Le titre du document ne respecte pas les convention XX_ressources_nomProsit_nomRessource_ue xx_ressources_titreDocument_titreProsit-ue."

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
 * @returns {{unite:String, prositId: String, prositNom: String, nomRessource:String}}
 */
export const extractVariableFromFileName = filename => {
    return {
        unite: filename.split("_")[filename.split('_').length - 1].split(".")[0],
        prositId: filename.split("_")[0],
        prositNom: filename.split("_")[2],
        nomRessource: filename.split("_")[3]
    }

}