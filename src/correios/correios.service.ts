import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { ReadCepExternalDto } from './dto/read-cep-external.dto';
import { CityService } from '../city/city.service';
import { ReadCepDto } from './dto/read-cep.dto';
import { CityEntity } from '../city/entity/city.entity';
import { Client } from 'nestjs-soap';
import { ResponsePriceCorreios } from './dto/response-price-correios.dto';

@Injectable()
export class CorreiosService {
  URL_CORREIOS = process.env.URL_CEP_CORREIOS;

  constructor(
    @Inject('SOAP_CORREIOS') private readonly soapClient: Client,
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async getAddressByCep(cep: string): Promise<ReadCepDto> {
    const responseCep: ReadCepExternalDto = await this.httpService.axiosRef
      .get<ReadCepExternalDto>(this.URL_CORREIOS.replace('{CEP}', cep))
      .then((result) => {
        if (result.data.erro === 'true') {
          throw new NotFoundException('Cep não encontrado');
        }

        return result.data;
      })
      .catch((err: AxiosError) => {
        throw new BadRequestException(
          `Erro na requisição para buscar o cep ${err.message}`,
        );
      });

    const city: CityEntity | undefined = await this.cityService
      .getCityByName(responseCep.localidade, responseCep.uf)
      .catch(() => undefined);

    console.log(city);

    return new ReadCepDto(responseCep, city?.id, city?.state?.id);
  }

  async getPriceDelivery(): Promise<ResponsePriceCorreios> {
    return new Promise((resolve) => {
      this.soapClient.CalcPrecoPrazo(
        {
          nCdServico: '40010',
          sCepOrigem: '55294267',
          sCepDestino: '55294210',
          nCdFormato: 2,
          nVlPeso: 1,
          nVlComprimento: 30,
          nVlAltura: 30,
          nVlLargura: 30,
          nVlDiametro: 30,
          nCdEmpresa: '',
          sDsSenha: '',
          sCdMaoPropria: 'N',
          nVlValorDeclarado: 0,
          sCdAvisoRecebimento: 'N',
        },
        (_, res: ResponsePriceCorreios) => {
          if (res) {
            resolve(res);
          } else {
            throw new BadRequestException('Erro SOAP');
          }
        },
      );
    });
  }
}
