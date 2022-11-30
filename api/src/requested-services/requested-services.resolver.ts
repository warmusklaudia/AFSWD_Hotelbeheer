import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RequestedServicesService } from './requested-services.service';
import { RequestedService } from './entities/requested-service.entity';
import { CreateRequestedServiceInput } from './dto/create-requested-service.input';
import { UpdateRequestedServiceInput } from './dto/update-requested-service.input';
import {
  ClientMessage,
  MessageTypes,
} from '../bootstrap/entities/ClientMessage';
import { Service } from '../services/entities/service.entity';
import { ServicesService } from '../services/services.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Resolver(() => RequestedService)
export class RequestedServicesResolver {
  constructor(
    private readonly requestedServicesService: RequestedServicesService,
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  @ResolveField()
  service(@Parent() rs: RequestedService): Promise<Service> {
    return this.servicesService.findOne(rs.serviceId);
  }

  @ResolveField()
  user(@Parent() rs: RequestedService): Promise<User> {
    return this.usersService.findOneByUid(rs.userId);
  }

  @Mutation(() => RequestedService)
  async createRequestedService(
    @Args('createRequestedServiceInput')
    createRequestedServiceInput: CreateRequestedServiceInput,
  ): Promise<RequestedService> {
    const rs = await this.requestedServicesService.create(
      createRequestedServiceInput,
    );

    if (rs)
      this.notificationsGateway.server
        .emit('hotel:requestedServices', rs);

    return rs;
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

  @Query(() => [RequestedService])
  findRequestedServicesByUserId(
    @Args('uid', { type: () => String }) uid: string,
  ): Promise<RequestedService[]> {
    return this.requestedServicesService.findByUserId(uid);
  }

  @Query(() => [RequestedService])
  findByServiceId(
    @Args('serviceId', { type: () => String }) serviceId: string,
  ): Promise<RequestedService[]> {
    return this.requestedServicesService.findByServiceId(serviceId);
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
