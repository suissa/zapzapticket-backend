import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EvolutionService } from "./evolution.service";
import * as amqp from "amqplib";

@Injectable()
export class RabbitmqService implements OnApplicationBootstrap {
  constructor(
    private configService: ConfigService,
    private evolutionService: EvolutionService
  ) {}

  async onApplicationBootstrap() {
    console.log("onApplicationBootstrap");
    await this.consumeMessages();
  }

  async consumeMessages() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();
    const queueName = this.configService.get<string>("RABBITMQ_QUEUE_NAME");

    await channel.assertQueue(queueName, { durable: false });

    const consumeSingleMessage = async () => {
      // console.log("\n\nRabbitmq Service consumeSingleMessage", new Date())
      const msg = await channel.get(queueName);
      if (msg) {
        const obj = msg.content.toString();
        const { data } = JSON.parse(obj);
        const dataObj = JSON.parse(data);
        console.log("Received in RabbitMQ service:", data);
        console.log("Received in RabbitMQ service:", dataObj.phone, dataObj.text, dataObj.instanceName);
        // Process the message here
        // aqui q envia msg pro Evolution Service
        await this.evolutionService.sendSimpleMessage(dataObj.phone, dataObj.text, dataObj.instanceName);
        channel.ack(msg);
      }
    };

    const interval = 10000;
    setInterval(async () => {
      await consumeSingleMessage();
    }, interval);
  }
}
