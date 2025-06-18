import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';
import { DevicesResolver } from 'src/devices/devices.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DevicesService, DevicesResolver],
})
export class DevicesModule {}
