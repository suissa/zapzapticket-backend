import { Test, TestingModule, mockResolvedValue } from "@nestjs/testing";
import { ContactService } from "./contact.service";
import { ConnectionService } from "../../connection/service/connection.service";
import { EvolutionService } from "../../evolution/service/evolution.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contact } from "./contact.model";
import { Query } from "mongoose";
import { CreateContactDto } from "../dto/create-contact.dto";


describe("ContactService", () => {
  let service: ContactService;
  let contactModel: Model<Contact>;

  const mockConnectionService = {
    getConnectionByInstanceName: jest.fn().mockResolvedValue({}),
  };

  const mockEvolutionService = {
    sendSimpleMessage: jest.fn().mockResolvedValue({

    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactService,
        {
          provide: ConnectionService,
          useValue: mockConnectionService, // Forneça um mock para ConnectionService
        },
        {
          provide: EvolutionService,
          useValue: mockEvolutionService, // Forneça um mock para EvolutionService
        },
        {
          provide: getModelToken(Contact.name),
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

    service = module.get<ContactService>(ContactService);
    contactModel = module.get<Model<Contact>>(getModelToken(Contact.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new contact", async () => {
      const request: CreateContactDto = {
        name: "Test Contact",
        phone: "123456789",
        email: "contact@test.com",
        status: "ativo",
        city: "cidade",
        state: "AC",
        country: "Brasil",
        profilePictureUrl: "",
        badges: ["teste"],
        messages: [],
      };
  
      const expectedResult = {
        ...request,
        _id: "6586033c9f031a4394c1852f",
        createdAt: new Date(),
        updatedAt: new Date(),
        badges: [], // Explicitly define the type of badges as an empty array
      };
  
      jest.spyOn(contactModel, "create").mockResolvedValue(expectedResult as any);
  
      const result = await service.create(request);
  
      expect(contactModel.create).toHaveBeenCalledWith(request);
      expect(result).toEqual(expectedResult);
    });
  });
  

  // describe("findAll", () => {
  //   it("should find all companies", async () => {
  //     const mockContactData = [
  //       new Contact({
  //         name: "Test Contact",
  //         phone: "123456789",
  //         planName: "Test Plan",
  //         planId: "Test Plan",
  //         toObject: function () { return this; },
  //       }),
  //     ];

  //     const mockExecResult = jest.fn().mockResolvedValue(mockContactData);
  //     const mockSortResult = jest.fn().mockReturnThis();
  //     const mockPopulateResult = jest.fn().mockReturnThis();

  //     jest.spyOn(contactModel, "find").mockImplementation(() => ({
  //       populate: mockPopulateResult,
  //       sort: mockSortResult,
  //       exec: mockExecResult,
  //     }) as unknown as Query<unknown[], unknown, {}, Contact, "find">);

  //     const result = await service.findAll();

  //     expect(mockPopulateResult).toHaveBeenCalled();
  //     expect(mockSortResult).toHaveBeenCalled();
  //     expect(mockExecResult).toHaveBeenCalled();
  //     expect(result).toEqual(mockContactData.map(contact => {
  //       const contactObj = contact.toObject();
  //       const planName = (contact.planId as any).name; // Casting para Plan, pois sabemos que foi populado
  //       return {
  //         ...contactObj,
  //         planName // Adiciona a propriedade planName com o valor do nome do plano
  //       };
  //     }));
  //   });
  // });

});