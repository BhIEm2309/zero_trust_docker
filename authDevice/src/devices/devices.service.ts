import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { RegisterDeviceInput } from './dto/register-device.input';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

  /**
   * Nuevo método para registrar un dispositivo
   */
  async registerDevice(input: RegisterDeviceInput): Promise<Device> {
    const existing = await this.deviceRepo.findOne({ where: { deviceId: input.deviceId } });

    if (existing) {
      throw new Error('Device already registered');
    }

    const device = this.deviceRepo.create({
      deviceId: input.deviceId,
      userId: input.userId,
      ip: input.ip,
      mac: input.mac,
      sistema_op: input.sistema_op,
    });

    return await this.deviceRepo.save(device);
  }

  /**
   * Genera un token JWT para un deviceId válido
   */
  async validateAndGenerateToken(deviceId: string): Promise<string> {
    const device = await this.deviceRepo.findOne({ where: { deviceId } });

    if (!device || !device.isActive) {
      throw new Error('Dispositivo no autorizado o inactivo');
    }

    const payload = {
      deviceId: device.deviceId,
      userId: device.userId,
    };

    const secret = process.env.JWT_SECRET || 'default_secret';

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }

  /**
   * Verifica un token JWT y devuelve sus datos
   */
  async verifyToken(token: string): Promise<{ deviceId: string; userId: string }> {
    const secret = process.env.JWT_SECRET || 'default_secret';

    try {
      const payload = jwt.verify(token, secret) as any;
      return {
        deviceId: payload.deviceId,
        userId: payload.userId,
      };
    } catch (err) {
      throw new Error('Token inválido o expirado');
    }
  }
}
