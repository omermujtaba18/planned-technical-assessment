import { Test, TestingModule } from '@nestjs/testing';
import { MemoriesService } from './memories.service';
import { getModelToken } from '@nestjs/sequelize';
import { Memory } from './models/memories.model';
import { MemoriesMedia } from '../memories-media/models/memories-media.model';
import { NotFoundException } from '@nestjs/common';
import { where } from 'sequelize';

describe('MemoriesService', () => {
  let service: MemoriesService;
  let memoryModel: any;
  let memoryMediaModel: any;

  beforeEach(async () => {
    const mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    };

    const mockMemoryModel = {
      create: jest.fn(),
      findAndCountAll: jest.fn(),
      findByPk: jest.fn(),
      destroy: jest.fn(),
      sequelize: {
        transaction: jest.fn().mockImplementation(async (callback) => {
          if (typeof callback === 'function') {
            return await callback(mockTransaction);
          }
          return mockTransaction;
        }),
      },
    };

    const mockMemoryMediaModel = {
      bulkCreate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemoriesService,
        { provide: getModelToken(Memory), useValue: mockMemoryModel },
        {
          provide: getModelToken(MemoriesMedia),
          useValue: mockMemoryMediaModel,
        },
      ],
    }).compile();

    service = module.get<MemoriesService>(MemoriesService);
    memoryModel = module.get(getModelToken(Memory));
    memoryMediaModel = module.get(getModelToken(MemoriesMedia));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new memory and save media', async () => {
      const userId = 1;
      const createMemoryDto = {
        title: 'Test Memory',
        description: 'Test Desc',
        timestamp: new Date(),
      };

      const files = [
        { path: 'uploads/file1.jpg' },
        { path: 'uploads/file2.jpg' },
      ] as Express.Multer.File[];

      const mockMemory = {
        id: 1,
        userId,
        ...createMemoryDto,
        toJSON: jest.fn().mockReturnValue({ id: 1, ...createMemoryDto }),
      };

      const mockMedia = files.map((file, index) => ({
        id: index + 1,
        memoryId: 1,
        url: `http://localhost:5001/${file.path}`,
      }));

      memoryModel.create.mockResolvedValue(mockMemory);
      memoryMediaModel.bulkCreate.mockResolvedValue(mockMedia);

      const result = await service.create(userId, createMemoryDto, files);

      expect(memoryModel.create).toHaveBeenCalledWith(
        { userId, ...createMemoryDto },
        { transaction: expect.any(Object) },
      );

      expect(memoryMediaModel.bulkCreate).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            memoryId: 1,
            url: expect.stringContaining('uploads/file1.jpg'),
          }),
          expect.objectContaining({
            memoryId: 1,
            url: expect.stringContaining('uploads/file2.jpg'),
          }),
        ]),
        { transaction: expect.any(Object) },
      );

      expect(result).toEqual({ ...mockMemory.toJSON(), media: mockMedia });
    });
  });

  describe('findAll', () => {
    it('should return paginated memories', async () => {
      const mockMemories = [
        {
          id: 1,
          title: 'Test Memory',
          description: 'Test Desc',
          timestamp: new Date(),
        },
      ];
      const count = 1;

      memoryModel.findAndCountAll.mockResolvedValue({
        rows: mockMemories,
        count,
      });

      const result = await service.findAll(1, 1, 10, 'DESC');

      expect(memoryModel.findAndCountAll).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
        order: [['timestamp', 'DESC']],
        where: { userId: 1 },
        include: [{ model: MemoriesMedia }],
      });

      expect(result).toEqual({
        data: mockMemories,
        totalItems: 1,
        totalPages: 1,
        currentPage: 1,
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

      memoryModel.findByPk.mockResolvedValue(mockMemory);

      const result = await service.findOne(1);

      expect(memoryModel.findByPk).toHaveBeenCalledWith(1, {
        include: [{ model: MemoriesMedia }],
      });
      expect(result).toEqual(mockMemory);
    });

    it('should throw NotFoundException if memory not found', async () => {
      memoryModel.findByPk.mockResolvedValue(null);

      await expect(service.findOne(99)).rejects.toThrow(NotFoundException);
      expect(memoryModel.findByPk).toHaveBeenCalledWith(99, {
        include: [{ model: MemoriesMedia }],
      });
    });
  });

  describe('remove', () => {
    it('should delete a memory', async () => {
      memoryModel.destroy.mockResolvedValue(1);

      const result = await service.remove(1);

      expect(result).toBe(1);
      expect(memoryModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should return 0 when trying to delete a non-existing memory', async () => {
      memoryModel.destroy.mockResolvedValue(0);

      const result = await service.remove(99);

      expect(result).toBe(0);
      expect(memoryModel.destroy).toHaveBeenCalledWith({ where: { id: 99 } });
    });
  });
});
