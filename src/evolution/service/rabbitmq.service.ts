import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitmqService implements OnApplicationBootstrap {
  constructor() {}

  async onApplicationBootstrap() {
    console.log("onApplicationBootstrap")
    await this.consumeMessages();
  }

  async consumeMessages() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Declare a queue to consume from
    const queueName = 'messages_queue';
    await channel.assertQueue(queueName, { durable: false });

    // Consume messages from the queue
    channel.consume(queueName, (msg) => {
      console.log("consume msg: ", msg)
      if (msg !== null) {
        const obj = msg.content.toString();
        const { data } = JSON.parse(obj);
        console.log('Received in RabbitMQ service:', data);
        console.log('Received in RabbitMQ service:', data.text);
        // Process the message here
        channel.ack(msg);
      }
    });

  }
}
