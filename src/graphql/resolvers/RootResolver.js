import { GraphQLScalarType } from "graphql";

export const RootResolver = {

    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: (value) => value.toISOString(),
        parseValue: (value) => new Date(value),
        parseLiteral: (ast) => new Date(ast.value)
      }),

}