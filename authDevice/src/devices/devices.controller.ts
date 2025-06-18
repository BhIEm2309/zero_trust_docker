import { Controller, Post, Body } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('auth/device')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async authenticate(@Body('deviceId') deviceId: string) {
    const token = await this.devicesService.validateAndGenerateToken(deviceId);
    return { token };
  }
}
