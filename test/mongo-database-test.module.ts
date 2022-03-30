import { MongoMemoryServer } from 'mongodb-memory-server';
import { TypegooseModule } from 'nestjs-typegoose';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = async () =>
  TypegooseModule.forRootAsync({
    useFactory: async () => {
      mongod = new MongoMemoryServer();
      const mongoUri = await mongod.getUri();
      return {
        uri: mongoUri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false,
        // useCreateIndex: true,
      };
    },
  });

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};
