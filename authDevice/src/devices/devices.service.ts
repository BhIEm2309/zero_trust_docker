import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepo: Repository<Device>,
  ) {}

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
