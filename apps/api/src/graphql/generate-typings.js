"use strict";
exports.__esModule = true;
var graphql_1 = require("@nestjs/graphql");
var path_1 = require("path");
var definitionsFactory = new graphql_1.GraphQLDefinitionsFactory();
definitionsFactory.generate({
    typePaths: ['**/*.graphql'],
    path: path_1.join(process.cwd(), '../../../../libs/interfaces/src/lib/graphql.ts'),
    emitTypenameField: true,
    watch: true
});
