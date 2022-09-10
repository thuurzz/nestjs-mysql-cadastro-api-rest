import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto) {
    const clienteExiste = await this.prisma.usuario.findFirst({
      where: {
        name: createClienteDto.name,
      },
    });

    if (clienteExiste) {
      throw new Error('Cliente já cadastrado!');
    }

    const cliente = await this.prisma.usuario.create({
      data: createClienteDto,
    });

    return cliente;
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateClienteDto: UpdateClienteDto) {
    return `This action updates a #${id} cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
