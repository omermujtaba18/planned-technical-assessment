import { Test, TestingModule } from '@nestjs/testing';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

describe('ShareController', () => {
  let controller: ShareController;
  let service: ShareService;

  const mockShareService = {
    findOne: jest.fn().mockImplementation((id) => ({
      id: 1,
      name: 'John Doe',
      memories: [
        {
          id: 1,
          title: 'Some title',
          description: 'Some description',
          media: [{ id: 1, url: 'http://example.com/image.jpg' }],
        },
      ],
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareController],
      providers: [{ provide: ShareService, useValue: mockShareService }],
    }).compile();

    controller = module.get<ShareController>(ShareController);
    service = module.get<ShareService>(ShareService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findOne and return the expected result', async () => {
    const id = '1';
    const result = {
      id: 1,
      name: 'John Doe',
      memories: [
        {
          id: 1,
          title: 'Some title',
          description: 'Some description',
          media: [{ id: 1, url: 'http://example.com/image.jpg' }],
        },
      ],
    };

    expect(await controller.findOne(id)).toEqual(result);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
