import {
    SchemaDirectiveVisitor
} from "graphql-tools";
import {
    extractToken,
    readToken
} from "../resolvers/utils/authHelpers";
import {
    AuthenticationError
} from "apollo-server-core";

export class isAuthenticatedDirective extends SchemaDirectiveVisitor {

    visitFieldDefinition(field) {
        const {
            resolve = defaultFieldResolver
        } = field;

        field.resolve = async (...args) => {

            const [, , context] = args

            const token = await extractToken(context);
            try {
                const _ = await readToken(token, context.secret);

                const result = await resolve.apply(this, args);
                console.log(result)
                return result[field.name];
            } catch (error) {

                console.log(error)
                throw new AuthenticationError(
                    "Non autorisé à acceder à cette ressource"
                );
            }
        }
    }

}