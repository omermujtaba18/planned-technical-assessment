import { Test, TestingModule } from '@nestjs/testing';
import { ShareController } from './share.controller';
import { ShareService } from './share.service';

describe('ShareController', () => {
  let controller: ShareController;
  let service: ShareService;

  const mockShareService = {
    findOneByUserId: jest.fn().mockResolvedValue({
      id: 1,
      fullName: 'John Doe',
    }),
    findAllMemoriesByUserId: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Some title',
          description: 'Some description',
          media: [{ id: 1, url: 'http://example.com/image.jpg' }],
        },
      ],
      totalPages: 2,
      currentPage: 2,
      totalItems: 1,
    }),
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

  it('should call findOneByUserId and return expected user data', async () => {
    const id = '1';
    const result = { id: 1, fullName: 'John Doe' };

    expect(await controller.findOneByUserId(id)).toEqual(result);
    expect(service.findOneByUserId).toHaveBeenCalledWith(1);
  });

  it('should call findAllMemoriesByUserId and return expected memory data', async () => {
    const id = '1';
    const page = 2;
    const limit = 5;
    const order = 'ASC';

    const result = {
      data: [
        {
          id: 1,
          title: 'Some title',
          description: 'Some description',
          media: [{ id: 1, url: 'http://example.com/image.jpg' }],
        },
      ],
      totalPages: 2,
      currentPage: 2,
      totalItems: 1,
    };

    expect(
      await controller.findAllMemoriesByUserId(id, page, limit, order),
    ).toEqual(result);
    expect(service.findAllMemoriesByUserId).toHaveBeenCalledWith(
      1,
      2,
      5,
      'ASC',
    );
  });
});
