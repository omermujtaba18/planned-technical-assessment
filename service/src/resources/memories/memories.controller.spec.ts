import { Test, TestingModule } from '@nestjs/testing';
import { MemoriesController } from './memories.controller';
import { MemoriesService } from './memories.service';
import { MemoriesMediaService } from '../memories-media/memories-media.service';
import { CreateMemoryDto } from './dto/create-memory.dto';

describe('MemoriesController', () => {
  let controller: MemoriesController;
  let memoriesService: MemoriesService;
  let memoriesMediaService: MemoriesMediaService;

  const mockMemoriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockMemoriesMediaService = {
    createBulk: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoriesController],
      providers: [
        { provide: MemoriesService, useValue: mockMemoriesService },
        { provide: MemoriesMediaService, useValue: mockMemoriesMediaService },
      ],
    }).compile();

    controller = module.get<MemoriesController>(MemoriesController);
    memoriesService = module.get<MemoriesService>(MemoriesService);
    memoriesMediaService =
      module.get<MemoriesMediaService>(MemoriesMediaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const req = { user: { id: 1 } };
      const dto: CreateMemoryDto = {
        title: 'Test Memory',
        description: 'Test Description',
        timestamp: new Date(),
      };
      const files = [{ filename: 'file1.jpg' } as Express.Multer.File];
      mockMemoriesService.create.mockResolvedValue({ id: 1, ...dto });

      const result = await controller.create(req, files, dto);
      expect(memoriesService.create).toHaveBeenCalledWith(
        req.user.id,
        dto,
        files,
      );
      expect(result).toEqual({ id: 1, ...dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of memories', async () => {
      const mockMemories = [{ id: 1, title: 'Test Memory' }];
      mockMemoriesService.findAll.mockResolvedValue(mockMemories);

      const result = await controller.findAll(
        { user: { id: 1 } },
        1,
        10,
        'DESC',
      );
      expect(memoriesService.findAll).toHaveBeenCalledWith(1, 1, 10, 'DESC');
      expect(result).toEqual(mockMemories);
    });
  });

  describe('findOne', () => {
    it('should return a memory', async () => {
      const mockMemory = { id: 1, title: 'Test Memory' };
      mockMemoriesService.findOne.mockResolvedValue(mockMemory);

      const result = await controller.findOne('1');
      expect(memoriesService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockMemory);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct ID', async () => {
      mockMemoriesService.remove.mockResolvedValue({ deleted: true });

      const result = await controller.remove('1');
      expect(memoriesService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ deleted: true });
    });
  });
});
