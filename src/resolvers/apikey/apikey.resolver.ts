import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TokenAPi, TokenApiObject } from '@src/redis/schema/api_token.schema';
import { TokenRepository } from '@src/redis/services/token.repository';

@Resolver()
export class ApikeyResolver {
  constructor(private readonly tokenRepository: TokenRepository) {}

  @Query(() => [TokenApiObject])
  async findAllTokensApi(): Promise<TokenApiObject[]> {
    return await this.tokenRepository.findAll();
  }

  @Query(() => TokenApiObject)
  async findTokenApiById(
    @Args('id', { type: () => String })
    id: string,
  ): Promise<TokenApiObject> {
    return await this.tokenRepository.findById(id);
  }

  @Mutation(() => Boolean)
  async deleteTokenApiById(
    @Args('id', { type: () => String })
    id: string,
  ): Promise<boolean> {
    return await this.tokenRepository.delete(id);
  }
}
