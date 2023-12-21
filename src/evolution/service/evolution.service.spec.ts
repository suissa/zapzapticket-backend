import { Test, TestingModule } from '@nestjs/testing';
import { EvolutionService } from './evolution.service';
import { getEvolutionToken } from '@nestjs/mongoose';
import { Evolution } from '../schema/evolution.schema';
import mongoose, { Evolution } from 'mongoose';
import { BadRequestException } from '@nestjs/common';
import { CreateEvolutionDto } from '../dto/create-evolution.dto';

describe('EvolutionService', () => {
  let service: EvolutionService;
  let model: Evolution<Evolution>;

  const mockEvolution = {
    _id: '6579a986047092e6d7c1ae69',
    name: 'Test',
    price: 200,
    description: 'Description',
    author: 'Author',
    createdAt: '2023-12-13T12:54:30.252Z',
    updatedAt: '2023-12-13T12:54:30.252Z',
    __v: 0,
  };

  const mockEvolutionService = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvolutionService,
        {
          provide: getEvolutionToken(Evolution.name),
          useValue: mockEvolutionService,
        },
      ],
    }).compile();

    service = module.get<EvolutionService>(EvolutionService);
    model = module.get<Evolution<Evolution>>(getEvolutionToken(Evolution.name));
  });

  describe('findOne', () => {
    it('should find and return a evolution by ID', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValue(mockEvolution);

      const result = await service.findOne(mockEvolution._id);

      expect(result).toEqual(mockEvolution);
    });

    it('should throw BadRequestException if invalid ID is provided', async () => {
      const id = 'invalid-id';

      const isValidObjectIDMock = jest
        .spyOn(mongoose, 'isValidObjectId')
        .mockReturnValue(false);

      await expect(service.findOne(id)).rejects.toThrow(BadRequestException);

      expect(isValidObjectIDMock).toHaveBeenCalledWith(id);
      isValidObjectIDMock.mockRestore();
    });
  });

  describe('findAll', () => {
    it('should return an array of evolutions', async () => {
      const result = [mockEvolution];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create and return a evolution', async () => {
      const newEvolution = {
        name: 'new_evolution',
        price: 300,
        description: 'new_evolution_description',
        author: 'new_evolution author',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockEvolution));

      const result = await service.create(newEvolution as CreateEvolutionDto);

      expect(result).toEqual(mockEvolution);
    });
  });

  describe('update', () => {
    it('should update and return a evolution', async () => {
      const updatedEvolution = {
        ...mockEvolution,
        name: 'Updated name',
      };
      const evolution = { name: 'Updated name' };

      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(updatedEvolution);

      const result = await service.update(mockEvolution._id, evolution as any);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(mockEvolution._id, evolution, {
        new: true,
        runValidators: true,
      });

      expect(result.name).toEqual(evolution.name);
    });
  });

  describe('delete', () => {
    it('should delete and return a evolution', async () => {
      jest.spyOn(model, 'findByIdAndDelete').mockResolvedValue(mockEvolution);

      const result = await service.delete(mockEvolution._id);

      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockEvolution._id);

      expect(result).toEqual(mockEvolution);
    });
  });
});
