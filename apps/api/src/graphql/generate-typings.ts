import { GraphQLDefinitionsFactory } from '@nestjs/graphql'
import { join } from 'path'

const definitionsFactory = new GraphQLDefinitionsFactory()
definitionsFactory.generate({
    typePaths: ['**/*.graphql'],
    path: join(process.cwd(), '../../../../libs/interfaces/src/lib/graphql.ts'),
    emitTypenameField: true,
    watch: true,
})
