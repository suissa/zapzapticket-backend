import { Test, TestingModule } from "@nestjs/testing";
import { ConnectionService } from "./connection.service";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Connection } from "./connection.model";
import { Query } from "mongoose";
import { CreateConnectionDto } from "../dto/create-connection.dto";
import { EvolutionService } from "../../evolution/service/evolution.service";


describe("ConnectionService", () => {
  let service: ConnectionService;
  let connectionModel: Model<Connection>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConnectionService,
        EvolutionService,
        {
          provide: getModelToken(Connection.name),
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

    service = module.get<ConnectionService>(ConnectionService);
    connectionModel = module.get<Model<Connection>>(getModelToken(Connection.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create a new connection", async () => {
      const request: CreateConnectionDto = {
        name: "Test Connection",
        phone: "123456789",
        instanceName: "test-instance",
        instanceStatus: true,
      };
  
      const expectedResult = new Connection({
        ...request,
        _id: "6586033c9f031a4394c1852f",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      jest.spyOn(connectionModel, "create").mockResolvedValue(expectedResult as any);
  
      const result = await service.create(request);
  
      expect(connectionModel.create).toHaveBeenCalledWith(request);
      expect(result).toEqual(expectedResult);
    });
  });
  

  // describe("findAll", () => {
  //   it("should find all companies", async () => {
  //     const mockConnectionData = [
  //       new Connection({
  //         name: "Test Connection",
  //         phone: "123456789",
  //         instanceName: "test-instance",
  //         instanceStatus: true,
  //         toObject: function () { return this; },
  //       }),
  //     ];

  //     const mockExecResult = jest.fn().mockResolvedValue(mockConnectionData);
  //     const mockSortResult = jest.fn().mockReturnThis();
  //     const mockPopulateResult = jest.fn().mockReturnThis();

  //     jest.spyOn(connectionModel, "find").mockImplementation(() => ({
  //       populate: mockPopulateResult,
  //       sort: mockSortResult,
  //       exec: mockExecResult,
  //     }) as unknown as Query<unknown[], unknown, {}, Connection, "find">);

  //     const result = await service.findAll();

  //     expect(mockPopulateResult).toHaveBeenCalled();
  //     expect(mockSortResult).toHaveBeenCalled();
  //     expect(mockExecResult).toHaveBeenCalled();
  //     expect(result).toEqual(mockConnectionData.map((item) => { return item.toObject(); }));
  //   });
  // });
});