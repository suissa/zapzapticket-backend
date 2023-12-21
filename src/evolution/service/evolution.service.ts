import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Evolution } from '../schema/evolution.schema';
import mongoose, { Model } from 'mongoose';
import { CreateEvolutionDto } from '../dto/create-evolution.dto';
import { CreateMessageDto } from '../dto/create-message.dto';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
const SERVER_EVOLUTION = "http://localhost:6666";

@Injectable()
export class EvolutionService {
  // constructor(@InjectModel(Evolution.name) private evolutionModel: Model<Evolution>) {}
  constructor(private configService: ConfigService) {}


  async create(request: CreateEvolutionDto): Promise<Evolution> {
    console.log("create request", request)
    // const data = {
    //   "instanceName": "instanceNest01",
    //   "token": "tokenAOIEKdjnj1701477826237",
    //   "qrcode": true
    // }

    const apiKey = this.configService.get<string>('APIKEY');
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    try {
      const result = await axios.post(`${SERVER_EVOLUTION}/instance/create`, request, headers);
      console.log(result);
      return result.data;
    } catch (error) {
      if (error.response) {
        // A solicitação foi feita e o servidor respondeu com um status fora do intervalo 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // A solicitação foi feita, mas nenhuma resposta foi recebida
        console.error('No response:', error.request);
      } else {
        // Algo aconteceu ao configurar a solicitação e desencadeou um erro
        console.error('Error message:', error.message);
      }
      console.log(error)
      throw error; // Lançar o erro para cima
    }
  }

  async findAll(): Promise<Evolution[]> {
    const apiKey = this.configService.get<string>('APIKEY');
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.get(`${SERVER_EVOLUTION}/instance/fetchInstances`, headers);

    return result.data;
  }

  async coonnectionState(instanceName): Promise<Evolution[]> {
    const headers = {
      headers: {
        apikey: "B6D711FCDE4D4FD5936544120E713976"
      }
    }
    const result = await axios.get(`${SERVER_EVOLUTION}/instance/connectionState/${instanceName}`, headers);
    return result.data;
  }

  async findOne(instanceName: string): Promise<Evolution> {
    const apiKey = this.configService.get<string>('APIKEY');
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.get(`${SERVER_EVOLUTION}/instance/connectionState/${instanceName}`, headers);

    return result.data;
  }

  async logout(instanceName: string) {
    const apiKey = this.configService.get<string>('APIKEY');
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.delete(`${SERVER_EVOLUTION}/instance/logout/${instanceName}`, headers);

    return result.data;
  }

  async delete(instanceName: string) {
    const apiKey = this.configService.get<string>('APIKEY');
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.delete(`${SERVER_EVOLUTION}/instance/delete/${instanceName}`, headers);

    return result.data;
  }

  async sendMessage(request: CreateMessageDto, instanceName: string) {
    const apiKey = this.configService.get<string>('APIKEY');
    const headers = {
      headers: {
        apikey: apiKey
      }
    }
    const result = await axios.post(`${SERVER_EVOLUTION}/message/sendText/${instanceName}`, request, headers);

    return result.data;
  }
}
