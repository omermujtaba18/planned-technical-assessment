import { Test, TestingModule } from '@nestjs/testing';
import { MemoriesService } from './memories.service';
import { getModelToken } from '@nestjs/sequelize';
import { Memory } from './models/memories.model';
import { MemoriesMedia } from '../memories-media/models/memories-media.model';

describe('MemoriesService', () => {
  let service: MemoriesService;
  let memoryModel: typeof Memory;

  beforeEach(async () => {
    const mockMemoryModel = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemoriesService,
        {
          provide: getModelToken(Memory),
          useValue: mockMemoryModel,
        },
      ],
    }).compile();

    service = module.get<MemoriesService>(MemoriesService);
    memoryModel = module.get<typeof Memory>(getModelToken(Memory));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new memory', async () => {
      const userId = 1;
      const createMemoryDto = {
        title: 'Test Memory',
        description: 'Test Desc',
        timestamp: new Date(),
      };
      const mockMemory = { id: 1, userId, ...createMemoryDto };

      (memoryModel.create as jest.Mock).mockResolvedValue(mockMemory);

      const result = await service.create(userId, createMemoryDto);

      expect(result).toEqual(mockMemory);
      expect(memoryModel.create).toHaveBeenCalledWith({
        userId,
        ...createMemoryDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all memories with media', async () => {
      const mockMemories = [
        {
          id: 1,
          title: 'Test Memory',
          description: 'Test Desc',
          timestamp: new Date(),
        },
      ];

      (memoryModel.findAll as jest.Mock).mockResolvedValue(mockMemories);

      const result = await service.findAll();

      expect(result).toEqual(mockMemories);
      expect(memoryModel.findAll).toHaveBeenCalledWith({
        include: [{ model: MemoriesMedia }],
      });
    });
  });

  describe('findOne', () => {
    it('should return a memory by id', async () => {
      const mockMemory = {
        id: 1,
        title: 'Test Memory',
        description: 'Test Desc',
        timestamp: new Date(),
      };

      (memoryModel.findByPk as jest.Mock).mockResolvedValue(mockMemory);

      const result = await service.findOne(1);

      expect(result).toEqual(mockMemory);
      expect(memoryModel.findByPk).toHaveBeenCalledWith(1, {
        include: [{ model: MemoriesMedia }],
      });
    });
  });

  describe('update', () => {
    it('should update a memory', async () => {
      const updateMemoryDto = { title: 'Updated Title' };
      (memoryModel.update as jest.Mock).mockResolvedValue([1]);

      const result = await service.update(1, updateMemoryDto);

      expect(result).toEqual([1]);
      expect(memoryModel.update).toHaveBeenCalledWith(updateMemoryDto, {
        where: { id: 1 },
      });
    });
  });

  describe('remove', () => {
    it('should delete a memory', async () => {
      (memoryModel.destroy as jest.Mock).mockResolvedValue(1);

      const result = await service.remove(1);

      expect(result).toBe(1);
      expect(memoryModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
