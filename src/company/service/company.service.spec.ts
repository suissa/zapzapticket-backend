import { Test, TestingModule } from "@nestjs/testing";
import { CompanyService } from "./company.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Company } from "./company.model";
import { Query } from "mongoose";
import { CreateCompanyDto } from "../dto/create-company.dto";

describe("CompanyService", () => {
  let service: CompanyService;
  let companyModel: Model<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getModelToken(Company.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            updateMany: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    companyModel = module.get<Model<Company>>(getModelToken(Company.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new company", async () => {
      const request: CreateCompanyDto = {
        name: "example",
        planId: "example",
        planName: "example",
        isActive: true,
        status: "example",
        dueDate: new Date().toString(),
        recurrence: true,
        phone: "example",
        password: "example",
        campaignsEnabled: true, // Updated to string value
      };
  
      const expectedResult = new Company({
        ...request,
        _id: "6586033c9f031a4394c1852f",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      jest.spyOn(companyModel, "create").mockResolvedValue(expectedResult as any);
  
      const result = await service.create(request);
  
      expect(companyModel.create).toHaveBeenCalledWith(request);
      expect(result).toEqual(expectedResult);
    });
  });
  

  describe("findAll", () => {
    it("should find all companies", async () => {
      const mockCompanyData = [
        new Company({
          name: "Test Company",
          phone: "123456789",
          planName: "Test Plan",
          planId: "Test Plan",
          toObject: function () { return this; },
        }),
      ];

      const mockExecResult = jest.fn().mockResolvedValue(mockCompanyData);
      const mockSortResult = jest.fn().mockReturnThis();
      const mockPopulateResult = jest.fn().mockReturnThis();

      jest.spyOn(companyModel, "find").mockImplementation(() => ({
        populate: mockPopulateResult,
        sort: mockSortResult,
        exec: mockExecResult,
      }) as unknown as Query<unknown[], unknown, {}, Company, "find">);

      const result = await service.findAll();

      expect(mockPopulateResult).toHaveBeenCalled();
      expect(mockSortResult).toHaveBeenCalled();
      expect(mockExecResult).toHaveBeenCalled();
      expect(result).toEqual(mockCompanyData.map(company => {
        const companyObj = company.toObject();
        const planName = (company.planId as any).name; // Casting para Plan, pois sabemos que foi populado
        return {
          ...companyObj,
          planName // Adiciona a propriedade planName com o valor do nome do plano
        };
      }));
    });
  });

});