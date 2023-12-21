import { Test, TestingModule } from '@nestjs/testing';
import { EvolutionController } from './evolution.controller';
import { EvolutionService } from '../service/evolution.service';
import { Evolution } from '../schema/evolution.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEvolutionDto } from '../dto/create-evolution.dto';
import { UpdateEvolutionDto } from '../dto/update-evolution.dto';

describe('EvolutionController', () => {
  let controller: EvolutionController;
  let service: EvolutionService;

  const mockEvolution = {
    _id: '6579a986047092e6d7c1ae69',
    name: 'Test',
    price: 200,
    description: 'Description',
    director: 'Diretor',
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  };

  const mockEvolutionService = {
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValueOnce([mockEvolution]),
    findOne: jest.fn().mockResolvedValueOnce(mockEvolution),
    update: jest.fn(),
    delete: jest.fn().mockResolvedValueOnce(mockEvolution),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvolutionController],
      providers: [
        {
          provide: EvolutionService,
          useValue: mockEvolutionService,
        },
      ],
    }).compile();

    controller = module.get<EvolutionController>(EvolutionController);
    service = module.get<EvolutionService>(EvolutionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should find all evolutions', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockEvolution]);
    });
  });

  describe('createEvolution', () => {
    it('should create a new evolution', async () => {
      const newEvolution = {
        name: 'new_evolution',
        price: 300,
        description: 'new_evolution_description',
        author: 'new_evolution author',
      };

      mockEvolutionService.create = jest.fn().mockResolvedValueOnce(mockEvolution);

      const result = await controller.create(newEvolution as CreateEvolutionDto);

      expect(service.create).toHaveBeenCalled();
      expect(result).toEqual(mockEvolution);
    });
  });

  describe('findOneEvolution', () => {
    it('should findOne a evolution By ID', async () => {
      const result = await controller.findOne(mockEvolution._id);

      expect(service.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockEvolution);
    });
  });

  describe('updateEvolution', () => {
    it('should update evolution by ID', async () => {
      const updatedEvolution = { ...mockEvolution, name: 'Updated name' };
      const evolution = { name: 'Updated name' };

      service.update = jest.fn().mockResolvedValueOnce(updatedEvolution);

      const result = await controller.update(
        mockEvolution._id,
        evolution as UpdateEvolutionDto,
      );

      expect(service.update).toHaveBeenCalled();
      expect(result).toEqual(updatedEvolution);
    });
  });

  describe('deleteEvolution', () => {
    it('should delete a evolution by ID', async () => {
      const result = await controller.delete(mockEvolution._id);

      expect(service.delete).toHaveBeenCalled();
      expect(result).toEqual(mockEvolution);
    });
  });
});
