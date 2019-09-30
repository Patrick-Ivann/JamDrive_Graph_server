import Fichiers from "../../mongoDB/PrositFichier";
import {
    GraphQLError
} from "graphql";
import {
    unlink,
    createWriteStream
} from "fs";
import {
    UserInputError
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

export const FileResolver = {


    Query: {

        PrositAller: async () => Fichiers.find({
            typeFichier: "aller"
        }),
        PrositRetour: async () => Fichiers.find({
            typeFichier: "retour"
        }),
        Prosit: async (_, args) => Fichiers.findOneById(args.id),

        Prosits: async () => Fichiers.find(),

    },

    Mutation: {

        UploadAllerProsit: async (root, args, context) => {
            const {
                createReadStream,
                filename,
                mimetype,
                encoding
            } = await args.file;




            let path = join(__dirname, '../../../fichiers/aller/') + filename

            const newFile = new Fichiers({
                id: mongoObjectId(),
                title: args.title,
                path: path,
                filename: filename,
                mimetype: mimetype,
                encoding: encoding,
                typeFichier: "aller"
            });

            let err, result;

            [err, result] = await to(newFile.save());

            if (err) return GraphQLError(err)

            const stream = createReadStream()

            stream.pipe(createWriteStream(join(__dirname, '../../../fichiers/aller/') + newFile.filename))


            pubsub.publish(FILE_SUBSCRIPTION_TOPIC, {
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




            let path = join(__dirname, '../../../fichiers/retour/') + filename

            const newFile = new Fichiers({
                id: mongoObjectId(),
                title: args.title,
                path: path,
                filename: filename,
                mimetype: mimetype,
                encoding: encoding,
                typeFichier: "retour"
            });

            let err, result;

            [err, result] = await to(newFile.save());

            if (err) return GraphQLError(err)

            const stream = createReadStream()

            stream.pipe(createWriteStream(join(__dirname, '../../../fichiers/retour/') + newFile.filename))


            pubsub.publish(FILE_SUBSCRIPTION_TOPIC, {
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
                validationError,
                returned
            } = isValideRessourceName(filename, {})


            if (!returned) {
                throw new UserInputError(validationError)
            }

            const {
                unite,
                prositId,
                prositNom,
                nomRessource
            } = extractVariableFromFileName(filename)


            const user = await readToken(await extractToken(context), context.secret)

            path = join(__dirname, '../fichiers/ressources/') + filename;

            const newFile = new ressources({
                id: mongoObjectId(),
                nomRessource: nomRessource,
                urlRessource: path,
                filename: filename,
                mimetype: mimetype,
                prositId: args.prositId,
                promoId: user.promoId,
                encoding: encoding,

            });

            let err, result;

            [err, result] = await to(newFile.save());


            if (err) return GraphQLError(err)

            const stream = createReadStream()


            stream.pipe(createWriteStream(join(__dirname, '../../../fichiers/aller/') + newFile.filename))


            pubsub.publish(FILE_SUBSCRIPTION_TOPIC, {
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


        }

    }



}