import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReadCepExternalDto } from './dto/read-cep-external.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get('/:cep')
  async getAll(@Param('cep') cep: string): Promise<ReadCepExternalDto> {
    return this.correiosService.getAddressByCep(cep);
  }
}
