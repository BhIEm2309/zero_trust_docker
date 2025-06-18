import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { DevicesService } from './devices.service';
import { AuthDeviceInput } from './dto/auth-device.input';
import { AuthResponse } from './models/auth-response.model';
import { VerifyResponse } from './models/verify-response.model';

@Resolver()
export class DevicesResolver {
  constructor(private readonly devicesService: DevicesService) {}

  /**
   * Mutación que autentica un dispositivo y devuelve un token
   */
  @Mutation(() => AuthResponse)
  async authenticateDevice(
    @Args('input') input: AuthDeviceInput,
  ): Promise<AuthResponse> {
    const token = await this.devicesService.validateAndGenerateToken(input.deviceId);
    return { token };
  }

  /**
   * Query para verificar un token JWT y devolver los datos del dispositivo
   */
  @Query(() => VerifyResponse)
  async verifyDeviceToken(
    @Args('token') token: string,
  ): Promise<VerifyResponse> {
    return this.devicesService.verifyToken(token);
  }

  /**
   * Query básica para pruebas
   */
  @Query(() => String)
  ping(): string {
    return 'pong';
  }
}
