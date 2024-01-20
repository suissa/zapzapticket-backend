import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from '../service/company.service';
import { Company } from "../service/company.model";
import { CreateCompanyDto } from '../dto/create-company.dto';
import { HttpCode, HttpStatus } from '@nestjs/common';

describe('CompanyController', () => {
  let companyController: CompanyController;
  let companyService: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService, Company],
    }).compile();

    companyController = module.get<CompanyController>(CompanyController);
    companyService = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(companyController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new company', async () => {
      const request: CreateCompanyDto = {
        name: 'example',
        planId: 'example',
        planName: 'example',
        isActive: true,
        status: 'example',
        dueDate: new Date().toString(),
        recurrence: true,
        phone: 'example',
        password: 'example',
        campaignsEnabled: true, // Updated to string value
      };
  
      const expectedResult = new Company({
        ...request,
        _id: '6586033c9f031a4394c1852f',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      jest.spyOn(companyService, 'create').mockResolvedValue(expectedResult as any);
  
      const result = await companyController.create(request); // Corrigido aqui
  
      expect(result).toBe(expectedResult);
      expect(companyService.create).toHaveBeenCalledWith(request); // Corrigido aqui
    });
  });

  // Add more test cases for other controller methods like findAll, findActives, findOne, update, delete
});
