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

  async findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateClienteDto: UpdateClienteDto) {
    const clienteExiste = await this.prisma.usuario.findFirst({
      where: {
        id: id,
      },
    });

    if (!clienteExiste) {
      throw new Error('Cliente não encontrado!');
    }

    return this.prisma.usuario.update({
      where: {
        id: id,
      },
      data: updateClienteDto,
    });
  }

  async remove(id: number) {
    const clienteExiste = await this.prisma.usuario.findFirst({
      where: {
        id: id,
      },
    });

    if (!clienteExiste) {
      throw new Error('Cliente não encontrado!');
    }

    return this.prisma.usuario.delete({
      where: { id: id },
    });
  }
}
