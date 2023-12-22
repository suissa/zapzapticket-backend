import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection } from '../schema/connection.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateConnectionDto } from '../dto/update-connection.dto';
import { CreateConnectionDto } from '../dto/create-connection.dto';
import { EvolutionService } from "../../evolution/service/evolution.service"

@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel(Connection.name) 
    private connectionModel: Model<Connection>,
    private evolutionService: EvolutionService) {
      this.init();
    }

  private async init() {
    await this.findInstancesInitiated();
  }

  async create(request: CreateConnectionDto): Promise<Connection> {
    return await this.connectionModel.create(request);
  }

  async findAll(): Promise<Connection[]> {
    return await this.connectionModel.find();
  }

  async findOne(id: string): Promise<Connection> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    return await this.connectionModel.findOne({ _id: id });
  }

  async update(id: string, request: UpdateConnectionDto) {
    return await this.connectionModel.findByIdAndUpdate(id, request, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string) {
    return await this.connectionModel.findByIdAndDelete(id);
  }

  async findInstancesInitiated() {
    const instances = await this.evolutionService.findAll();
    console.log("findInstancesInitiated instances: ", instances)
  //   instances.forEach(async ({instance}) => {
  //   console.log("findInstancesInitiated ___instance:", instance);
  //   if (!instance.owner){
  //     // deleta instancia q ta close
  //     if (instance.status == "close") {
  //       const { data } = await axios.delete(`${SERVER}/instance/delete/${instance.instanceName}`, {
  //         headers: {
  //           "apikey": GLOBAL_KEY,
  //           'Content-Type': 'application/json',
  //         }
  //       });
  //       console.log("DELETADA data:", data);
  //     }
  //     return false;
  //   }
  //   _instances.push(instance);
  //   const { instanceName } = instance;
  //   console.log("findInstancesInitiated instanceName:", instanceName);
  //   const phone = instanceName.split("-")[1];
  //   const result = await Numero.updateOne({ phone }, { instancia_status: true, instancia: instanceName });
    
  //   console.log("findInstancesInitiated result:", result);
  // });
  }
}

// async findInstancesInitiated() {
//   let _instances = [];
//   const numerosUpdate = await Numero.updateMany({}, {instancia_status: false, instancia: ""});
//   console.log("findInstancesInitiated numerosUpdate:", numerosUpdate);
//   const instances = await instancesList();
//   console.log("findInstancesInitiated instances:", instances);
//   instances.forEach(async ({instance}) => {
//     console.log("findInstancesInitiated ___instance:", instance);
//     if (!instance.owner){
//       // deleta instancia q ta close
//       if (instance.status == "close") {
//         const { data } = await axios.delete(`${SERVER}/instance/delete/${instance.instanceName}`, {
//           headers: {
//             "apikey": GLOBAL_KEY,
//             'Content-Type': 'application/json',
//           }
//         });
//         console.log("DELETADA data:", data);
//       }
//       return false;
//     }
//     _instances.push(instance);
//     const { instanceName } = instance;
//     console.log("findInstancesInitiated instanceName:", instanceName);
//     const phone = instanceName.split("-")[1];
//     const result = await Numero.updateOne({ phone }, { instancia_status: true, instancia: instanceName });
    
//     console.log("findInstancesInitiated result:", result);
//   });
//   console.log("findInstancesInitiated _instances:", _instances)
//   return _instances;
// }