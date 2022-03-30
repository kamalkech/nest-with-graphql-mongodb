import { InternalServerErrorException } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import {
  CreateQuery,
  DocumentQuery,
  FilterQuery,
  Query,
  QueryFindOneAndUpdateOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { MongoError } from 'mongodb';
import { BaseModel } from '../models/base.model';

type QueryList<T extends BaseModel> = DocumentQuery<
  Array<DocumentType<T>>,
  DocumentType<T>
>;
type QueryItem<T extends BaseModel> = DocumentQuery<
  DocumentType<T>,
  DocumentType<T>
>;

interface QueryOptions {
  lean?: boolean;
  autopopulate?: boolean;
}

export type ModelType<TModel extends BaseModel> = ReturnModelType<
  AnyParamConstructor<TModel>
>;

export abstract class BaseRepository<TModel extends BaseModel> {
  protected model: ModelType<TModel>;

  protected constructor(model: ModelType<TModel>) {
    this.model = model;
  }

  private static get defaultOptions(): QueryOptions {
    return { lean: true, autopopulate: true };
  }

  private static getQueryOptions(options?: QueryOptions) {
    const mergedOptions = {
      ...BaseRepository.defaultOptions,
      ...(options || {}),
    };
    const option = mergedOptions.lean ? { virtuals: true } : null;

    if (option && mergedOptions.autopopulate) {
      option['autopopulate'] = true;
    }

    return { lean: option, autopopulate: mergedOptions.autopopulate };
  }

  protected static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  createModel(doc?: Partial<TModel>): TModel {
    return new this.model(doc);
  }

  findAll(options?: QueryOptions): QueryList<TModel> {
    return this.model
      .find()
      .setOptions(BaseRepository.getQueryOptions(options));
  }

  findOne(options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findOne()
      .setOptions(BaseRepository.getQueryOptions(options));
  }

  findById(id: string, options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findById(Types.ObjectId(id))
      .setOptions(BaseRepository.getQueryOptions(options));
  }

  async create(item: CreateQuery<TModel>): Promise<DocumentType<TModel>> {
    try {
      return await this.model.create(item);
    } catch (e) {
      BaseRepository.throwMongoError(e);
    }
  }

  deleteOne(options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findOneAndDelete()
      .setOptions(BaseRepository.getQueryOptions(options));
  }

  deleteById(id: string, options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findByIdAndDelete(Types.ObjectId(id))
      .setOptions(BaseRepository.getQueryOptions(options));
  }

  deleteAll(): Promise<any> {
    return this.model.deleteMany({}).exec();
  }

  update(item: TModel, options?: QueryOptions): QueryItem<TModel> {
    return this.model
      .findByIdAndUpdate(Types.ObjectId(item.id), { $set: item } as any, {
        omitUndefined: true,
        new: true,
      })
      .setOptions(BaseRepository.getQueryOptions(options));
  }

  updateById(
    id: string,
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    updateOptions: QueryFindOneAndUpdateOptions & { multi?: boolean } = {},
    options?: QueryOptions,
  ): QueryItem<TModel> {
    return this.updateByFilter(
      { _id: Types.ObjectId(id) as any },
      updateQuery,
      updateOptions,
      options,
    );
  }

  updateByFilter(
    filter: FilterQuery<DocumentType<TModel>> = {},
    updateQuery: UpdateQuery<DocumentType<TModel>>,
    updateOptions: QueryFindOneAndUpdateOptions = {},
    options?: QueryOptions,
  ): QueryItem<TModel> {
    return this.model
      .findOneAndUpdate(filter, updateQuery, {
        ...Object.assign({ omitUndefined: true }, updateOptions),
        new: true,
      })
      .setOptions(BaseRepository.getQueryOptions(options));
  }

  count(filter: FilterQuery<DocumentType<TModel>> = {}): Query<number> {
    return this.model.count(filter);
  }

  async countAsync(
    filter: FilterQuery<DocumentType<TModel>> = {},
  ): Promise<number> {
    try {
      return await this.count(filter);
    } catch (e) {
      BaseRepository.throwMongoError(e);
    }
  }

  async exists(
    filter: FilterQuery<DocumentType<TModel>> = {},
  ): Promise<boolean> {
    try {
      return await this.model.exists(filter);
    } catch (e) {
      BaseRepository.throwMongoError(e);
    }
  }
}
