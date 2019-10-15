import { mkdirSync, existsSync } from "fs";

/**
 * Promise wrapper to handle Error with ease
 * @param {Promise} promise 
 * @returns {Promise}
 */
export default function to(promise) {
    return promise.then(data => {
       return [null, data];
    })
    .catch(err => [err]);
 }

/**
 * Check if folder exists at a given path and create it if not
 * @param {String} path 
 */
export const createFolderIfNonExistent = path => !existsSync(path) && mkdirSync(path, { recursive: true })
