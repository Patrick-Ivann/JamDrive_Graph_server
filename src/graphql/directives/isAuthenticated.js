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
        field.resolve = async (result, args, context) => {

            const token = await extractToken(context);

            try {
                const _ = await readToken(token);
                return result[field.name];
            } catch (error) {
                throw new AuthenticationError({
                    message: "Non autorisé à acceder à cette ressource"
                });
            }
        }
    }

}