import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ReadCepDto } from './dto/read-cep.dto';
import { ResponsePriceCorreios } from './dto/response-price-correios.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get('/price')
  async priceDelivery(): Promise<ResponsePriceCorreios> {
    return this.correiosService.getPriceDelivery();
  }

  @Get('/:cep')
  async getAll(@Param('cep') cep: string): Promise<ReadCepDto> {
    return this.correiosService.getAddressByCep(cep);
  }
}
