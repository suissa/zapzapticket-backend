import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Book } from 'src/book/schema/book.schema';
const ObjectId = require('mongoose').Types.ObjectId;

describe('AppController (e2e)', () => {
  let app: INestApplication;

  const mockBook = {
    name: 'Test',
    price: 200,
    description: 'Description',
    author: 'Author',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .expect('Hello World!');
  });

  it('/book (POST)', () => {
    return request(app.getHttpServer())
      .post('/book')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .send(mockBook);
  });

  it('/book (GET)', () => {
    return request(app.getHttpServer()).get('/book').expect(HttpStatus.OK);
  });

  it('/book/{id} (GET ONE)', () => {
    return request(app.getHttpServer())
      .get('/book/6579ca030447ea9095a3bcba')
      .expect(HttpStatus.OK);
  });

  it('/book/{id} (UPDATE ONE)', () => {
    return request(app.getHttpServer())
      .patch('/book/6579ca030447ea9095a3bcba')
      .send({ name: 'Updated name' })
      .expect(HttpStatus.OK);
  });

  it('/book/{id} (DELETE ONE)', () => {
    return request(app.getHttpServer())
      .delete('/book/6579ca030447ea9095a3bcba')
      .expect(HttpStatus.OK);
  });
});
