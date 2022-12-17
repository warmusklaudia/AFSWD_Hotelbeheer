import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage';

@Resolver(() => Service)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Mutation(() => Service)
  createService(
    @Args('createServiceInput') createServiceInput: CreateServiceInput,
  ): Promise<Service> {
    return this.servicesService.create(createServiceInput);
  }

  @Query(() => [Service], { name: 'services' })
  findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Query(() => Service, { name: 'service' })
  findOne(@Args('id', { type: () => String }) id: string): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @Mutation(() => Service)
  updateService(
    @Args('updateServiceInput') updateServiceInput: UpdateServiceInput,
  ) {
    return this.servicesService.update(updateServiceInput);
  }

  @Mutation(() => Service)
  async removeService(
    @Args('id', { type: () => String }) id: string,
  ): Promise<ClientMessage> {
    const deleted = await this.servicesService.remove(id);
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Service deleted',
        statusCode: 200,
      };

    return {
      type: MessageTypes.error,
      message: 'Delete action went wrong.',
      statusCode: 400,
    };
  }
}
