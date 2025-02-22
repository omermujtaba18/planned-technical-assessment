import { Test, TestingModule } from '@nestjs/testing';
import { MemoriesMediaService } from './memories-media.service';
import { getModelToken } from '@nestjs/sequelize';
import { MemoriesMedia } from './models/memories-media.model';

describe('MemoriesMediaService', () => {
  let service: MemoriesMediaService;
  let memoryMediaModelMock: { create: jest.Mock; bulkCreate: jest.Mock };

  beforeEach(async () => {
    memoryMediaModelMock = {
      create: jest.fn(),
      bulkCreate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemoriesMediaService,
        {
          provide: getModelToken(MemoriesMedia),
          useValue: memoryMediaModelMock,
        },
      ],
    }).compile();

    service = module.get<MemoriesMediaService>(MemoriesMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create method with correct parameters', async () => {
    const dto = { memoryId: 1, url: 'test-url' };
    memoryMediaModelMock.create.mockResolvedValue(dto);

    const result = await service.create(dto);
    expect(memoryMediaModelMock.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });

  it('should call createBulk method with correct parameters', async () => {
    const dtoArray = [
      { memoryId: 1, url: 'test-url-1' },
      { memoryId: 2, url: 'test-url-2' },
    ];
    memoryMediaModelMock.bulkCreate.mockResolvedValue(dtoArray);

    const result = await service.createBulk(dtoArray);
    expect(memoryMediaModelMock.bulkCreate).toHaveBeenCalledWith(dtoArray);
    expect(result).toEqual(dtoArray);
  });
});
