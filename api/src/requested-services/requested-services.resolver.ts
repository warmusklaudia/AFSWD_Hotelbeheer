import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequestedServicesService } from './requested-services.service';
import { RequestedService } from './entities/requested-service.entity';
import { CreateRequestedServiceInput } from './dto/create-requested-service.input';
import { UpdateRequestedServiceInput } from './dto/update-requested-service.input';
import {
  ClientMessage,
  MessageTypes,
} from 'src/bootstrap/entities/ClientMessage';

@Resolver(() => RequestedService)
export class RequestedServicesResolver {
  constructor(
    private readonly requestedServicesService: RequestedServicesService,
  ) {}

  @Mutation(() => RequestedService)
  createRequestedService(
    @Args('createRequestedServiceInput')
    createRequestedServiceInput: CreateRequestedServiceInput,
  ): Promise<RequestedService> {
    return this.requestedServicesService.create(createRequestedServiceInput);
  }

  @Query(() => [RequestedService], { name: 'requestedServices' })
  findAll(): Promise<RequestedService[]> {
    return this.requestedServicesService.findAll();
  }

  @Query(() => RequestedService, { name: 'requestedService' })
  findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<RequestedService> {
    return this.requestedServicesService.findOne(id);
  }

  @Mutation(() => RequestedService)
  updateRequestedService(
    @Args('updateRequestedServiceInput')
    updateRequestedServiceInput: UpdateRequestedServiceInput,
  ) {
    return this.requestedServicesService.update(updateRequestedServiceInput);
  }

  @Mutation(() => RequestedService)
  async removeRequestedService(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.requestedServicesService.remove(id);
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'RequestedService deleted',
        statusCode: 200,
      };

    return {
      type: MessageTypes.error,
      message: 'Delete action went wrong.',
      statusCode: 400,
    };
  }
}
