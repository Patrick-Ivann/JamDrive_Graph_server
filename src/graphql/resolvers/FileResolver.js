import Fichiers from "../../mongoDB/PrositFichier";
import {
    GraphQLError
} from "graphql";
import {
    unlink,
    createWriteStream,
} from "fs";
import {
    UserInputError, AuthenticationError, ApolloError
} from "apollo-server-core";
import {
    extractVariableFromFileName,
    isValideRessourceName
} from "./utils/fileHelpers";
import {
    join
} from "path";
import ressources from "../../mongoDB/Ressources";
import {
    readToken,
    extractToken
} from "./utils/authHelpers";
import {
    Stream
} from "stream";
import to from "../../utils";
import {
    PubSub
} from "graphql-subscriptions";
import Prosits from "../../mongoDB/Prosit";
import {
    fetch
} from "apollo-env";

const pubsub = new PubSub();
export const FileResolver = {

/**
 * TODO ADD AN HTTP ERROR HANDLING METHOD TO FORMAT ERROR RESPONSE (throw ?)
 */

    Query: {

        PrositAller: async () => Fichiers.find({
            typeFichier: "aller"
        }),
        PrositRetour: async () => Fichiers.find({
            typeFichier: "retour"
        }),


        
    },
    
    Mutation: {

        UploadAllerProsit: async (root, args, context) => {
            const {
                createReadStream,
                filename,
                mimetype,
                encoding
            } = await args.file;


            const {
                title,
                nom,
                prositId
            } = await args;
            
            const {
                user: user
            } = await readToken(await extractToken(context), context.secret)

            let path = join(__dirname, '../../../fichiers/aller/') + user.promoId + "_" + filename
            
            const newFile = new Fichiers({
                //id: mongoObjectId(),
                title: title,
                nom: nom,
                prositId: prositId,
                path: path,
                filename: filename,
                mimetype: mimetype,
                encoding: encoding,
                typeFichier: "aller"
            });

            let err, result;

            [err, result] = await to(newFile.save());

            if (err) return GraphQLError({
                err
            })

            const stream = createReadStream()
            try {
                stream.pipe(createWriteStream(join(__dirname, '../../../fichiers/aller/') + user.promoId + "_" + newFile.filename))
            } catch (error) {
                console.log("bobo le code")
            }

            
            
            pubsub.publish("FILE_SUBSCRIPTION_TOPIC", {
                newFile: newFile,
            });
            return result
            
            

        },
        UploadRetourProsit: async (root, args, context) => {
            const {
                createReadStream,
                filename,
                mimetype,
                encoding
            } = await args.file;
            
            const {
                title,
                nom,
                prositId,
            } = await args;

            const {
                user: user
            } = await readToken(await extractToken(context), context.secret)
            
            let path = join(__dirname, '../../../fichiers/retour/') + user.promoId + "_" + filename

            const newFile = new Fichiers({
                // id: mongoObjectId(),
                title: title,
                nom: nom,
                prositId: prositId,
                promoId: user.promoId,
                path: path,
                filename: filename,
                mimetype: mimetype,
                encoding: encoding,
                typeFichier: "retour"
            });
            
            let err, result;

            [err, result] = await to(newFile.save());
            
            if (err) return GraphQLError({
                err
            })

            const stream = createReadStream()

            try {
                stream.pipe(createWriteStream(join(__dirname, '../../../fichiers/retour/') + user.promoId + "_" + newFile.filename))
            } catch (error) {
                console.log("bobo le code")
            }


            pubsub.publish("FILE_SUBSCRIPTION_TOPIC", {
                newFile: newFile,
            });
            return result
            
            
            
        },
        UploadProfRessource: async (root, args, context) => {
            
            const {
                createReadStream,
                filename,
                mimetype,
                encoding
            } = await args.file;
            
            const {
                title,
                nom,
                unite,
                prositId
            } = await args;
            
            

            /*             const {
                validationError,
                returned
            } = isValideRessourceName(filename, {})

            
            if (!returned) {
                throw new UserInputError(validationError)
            } */
            

            const {
                user: user
            } = await readToken(await extractToken(context), context.secret)

            let path = join(__dirname, '../fichiers/ressources/') + user.promoId + "_" + filename
            
            /*             const newFile = new ressources({
                            //  id: mongoObjectId(),
                            title: title,
                            nomRessource: nom,
                            unite:unite,
                            urlRessource: path,
                            filename: filename,
                            mimetype: mimetype,
                            prositId: prositId,
                            specificite: "prof",
                            promoId: user.promoId,
                            encoding: encoding,
                            
                        }); */

                        const newFile = new Fichiers({
                // id: mongoObjectId(),
                title: title,
                nom: nom,
                prositId: prositId,
                promoId: user.promoId,
                path: path,
                filename: filename,
                mimetype: mimetype,
                encoding: encoding,
                typeFichier: "ressource_prof"
            });

            let err, result;
            
            [err, result] = await to(newFile.save());
            console.log(err)
            console.log(result)

            if (err) return GraphQLError({
                err
            })
            
            const stream = createReadStream()
            

            stream.pipe(createWriteStream(join(__dirname, '../../../fichiers/ressource/') + user.promoId + "_" + newFile.filename))
            
            
            pubsub.publish("FILE_SUBSCRIPTION_TOPIC", {
                newFile: newFile,
            });
            return result

        },
        UploadEleveRessource: async (root, args, context) => {
            
            const {
                createReadStream,
                filename,
                mimetype,
                encoding
            } = await args.file;
            
            const {
                title,
                nom,
                unite,
                prositId
            } = await args;

            
            
            /*             const {
                validationError,
                returned
                        } = isValideRessourceName(filename, {})


                        if (!returned) {
                            throw new UserInputError(validationError)
                        }
             */
            
            const {
                user: user
            } = await readToken(await extractToken(context), context.secret)
            
            let path = join(__dirname, '../fichiers/ressources/') + user.promoId + "_" + filename
            
            /*  const newFile = new ressources({
                //  id: mongoObjectId(),
                 title: title,
                 nomRessource: nom,
                 unite:unite,
                 urlRessource: path,
                 filename: filename,
                 mimetype: mimetype,
                 prositId: prositId,
                 specificite: "eleve",
                 promoId: user.promoId,
                 encoding: encoding,
                 
             }); */
             
             const newFile = new Fichiers({
                 // id: mongoObjectId(),
                 title: title,
                 nom: nom,
                 prositId: prositId,
                promoId: user.promoId,
                path: path,
                filename: filename,
                mimetype: mimetype,
                encoding: encoding,
                typeFichier: "ressource_eleve"
            });

            let err, result;
            
            [err, result] = await to(newFile.save());


            if (err) return GraphQLError({
                err
            })

            const stream = createReadStream()
            

            stream.pipe(createWriteStream(join(__dirname, '../../../fichiers/ressource/') + user.promoId + "_" + newFile.filename))

            
            pubsub.publish("FILE_SUBSCRIPTION_TOPIC", {
                newFile: newFile,
            });
            return result

        },
        UploadRessource: async (root, args, context) => {

            const {
                createReadStream,
                filename,
                mimetype,
                encoding
            } = await args.file;
            
            const {
                title,
                nom,
                prositId
            } = await args;

            
            const {
                validationError,
                returned
            } = isValideRessourceName(filename, {})


            if (!returned) {
                throw new UserInputError(validationError)
            }
            
            
            
            const user = await readToken(await extractToken(context), context.secret)
            
            path = join(__dirname, '../fichiers/ressources/') + filename;
            
            const newFile = new ressources({
                //  id: mongoObjectId(),
                nomRessource: nomRessource,
                urlRessource: path,
                filename: filename,
                mimetype: mimetype,
                prositId: prositId,
                specificite: "prof",
                promoId: user.promoId,
                encoding: encoding,
                
            });

            let err, result;

            [err, result] = await to(newFile.save());
            
            
            if (err) return GraphQLError({
                err
            })
            
            const stream = createReadStream()
            

            stream.pipe(createWriteStream(join(__dirname, '../../../fichiers/aller/') + newFile.filename))


            pubsub.publish("FILE_SUBSCRIPTION_TOPIC", {
                newFile: newFile,
            });
            return result
            
        },
        DeleteProsit: async (root, args, context) => {
            
            const {
                id
            } = args;
            let err, prosit;
            [err, prosit] = await to(Fichiers.findOneAndDelete(args.id))
            
            if (err) return err

            [err, file] = await to(unlink(prosit.path));
            if (err) return err

            return true

            
        },
        DeleteRessource: async (root, args, context) => {
            
            const {
                id
            } = args;
            let err, ressource;
            [err, file] = await to(unlink(prosit.path));
            if (err) return err

            
            [err, prosit] = await to(ressources.findOneAndDelete(args.id))

            if (err) return err

            
            return true
            
            
        },
        
        filePathZippedByUnite: async (root, args, context) => {
    
            let err, user, prositList, prositFileArray, urlToZip;
            [err, user] = await to(readToken(await extractToken(context), context.secret))
            if (err) throw new AuthenticationError(err)
    
             prositList = await Prosits.find({
                unite: args.unite,
                promoId: user.user.promoId
            });
            if (err) {console.error(err); throw new ApolloError(err)}
            const asyncFileFetching = async (element) => {
                return await Fichiers.find({
                    prositId: element._id
                })
            };
            
            const getArrayOfPrositFile = async () => {
                return await Promise.all(prositList.map(item => asyncFileFetching(item)))
            }
            
            
            [err, prositFileArray] = await to(getArrayOfPrositFile());
            if (err) {console.error(err); throw new ApolloError(err)}
            var dataToSendObj = {
                toCompress: [[].concat(...prositFileArray).map(({
                    path
                }) => path)],
                archiveName: `${args.unite}.zip`
            };
            var body = JSON.stringify(dataToSendObj);
            [err, urlToZip] = await to(fetch(`${context.compressApiBaseUrl}/compress`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8"
                },
                body: body
    
            }));
            if (err) {console.error(err); throw new ApolloError(err)}
            return (await urlToZip.text()).split("\\")[4]
        },
    
        filePathZippedByPrositId: async (root, {prositId}, context) => {
    
            let err, user, fileArray, urlToZip;
            [err, user] = await to(readToken(await extractToken(context), context.secret))
            if (err) throw new AuthenticationError(err)
    
            fileArray = await Fichiers.find({             
                "prositId": prositId
            });


            if (!fileArray) throw new ApolloError("EMPTY"); 
            if (err) {console.error(err); throw new ApolloError(err)}
            
            var dataToSendObj = {
                toCompress: [fileArray.map(({
                    path
                }) => path)],
                archiveName: `${fileArray[0].nom}.zip`
            };
            var body = JSON.stringify(dataToSendObj);
            [err, urlToZip] = await to(fetch(`${context.compressApiBaseUrl}/compress`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8"
                },
                body: body
    
            }));
            if (err) {console.error(err); throw new ApolloError(err)}
            return (await urlToZip.text()).split("\\")[4]
        }
    }
    

    
}