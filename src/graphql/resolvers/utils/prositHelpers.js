import Fichiers from "../../../mongoDB/PrositFichier";
import {
    unlink,
    copyFile
} from "fs";
import to from "../../../utils";
import {
    ApolloError
} from "apollo-server-core";
import {
    promisify
} from "util";

/**
 * Delete every reference and related files
 * @param {String} prositId
 * @returns {Promise} 
 */
export const reccursiveDeletion = async (prositId) => {

    const DeleteAsync = promisify(unlink);


    let fileToDeleteArray = await Fichiers.find({
        prositId: prositId
    })

    const asyncFileDeletion = async (id) => {
        let err, file;
        [err, file] = await to(Fichiers.findByIdAndDelete(id))
        if (err) {
            console.error(err)
            return Promise.reject(new Error(400));
        }
        return file
    };

    const asyncDeletion = async (path) => {
        let err, file;
        [err, file] = await to(DeleteAsync(path))
        if (err) {
            console.error(err)
            return Promise.reject(new Error(400));
        }
        return path
    }

    return (await Promise.all(fileToDeleteArray.map((file) => {
            asyncDeletion(file.path).catch(err => {
                console.error(err);
            throw new ApolloError("Probleme de suppression fichier")
            }),
            asyncFileDeletion(file._id).catch(err=>{
                console.error(err);
                throw new ApolloError("Probleme de suppression fichier")
            })

        })
        
    ))



}