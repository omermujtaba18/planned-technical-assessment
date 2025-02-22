import { Test, TestingModule } from '@nestjs/testing';
import { MemoriesMediaController } from './memories-media.controller';
import { MemoriesMediaService } from './memories-media.service';
import { CreateMemoriesMediaDto } from './dto/create-memories-media.dto';

describe('MemoriesMediaController', () => {
  let controller: MemoriesMediaController;
  let service: MemoriesMediaService;

  const mockMemoriesMediaService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemoriesMediaController],
      providers: [
        {
          provide: MemoriesMediaService,
          useValue: mockMemoriesMediaService,
        },
      ],
    }).compile();

    controller = module.get<MemoriesMediaController>(MemoriesMediaController);
    service = module.get<MemoriesMediaService>(MemoriesMediaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create method in the service with correct DTO', async () => {
    const dto: CreateMemoriesMediaDto = { memoryId: 1, url: 'test-url' };
    mockMemoriesMediaService.create.mockResolvedValue(dto);

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });
});
