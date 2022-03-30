import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { ResolversModule } from './resolvers/resolvers.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql'),
          uploads: false,
          sortSchema: true,
          introspection: true,
          playground: configService.get<boolean>('GRAPHQL_PLAYGROUND'),
          debug: configService.get<boolean>('GRAPHQL_DEBUG'),
          cors: {
            credentials: true,
            origin: true,
          },
          context: ({ req, res }) => ({ req, res }),
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    DatabaseModule,
    AdminModule,
    SharedModule,
    ResolversModule,
    DatabaseModule,
  ],
  providers: [AppService],
})
export class AppModule {}
