import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
})
export abstract class BaseModel extends TimeStamps {
  @prop()
  createdAt: Date; // provided by schemaOptions.timestamps

  @prop()
  updatedAt: Date; // provided by schemaOptions.timestamps
  id: string; // _id getter as string
}
