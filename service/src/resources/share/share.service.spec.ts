import { Test, TestingModule } from '@nestjs/testing';
import { ShareService } from './share.service';
import { UsersService } from '../users/users.service';
import { MemoriesService } from '../memories/memories.service';

describe('ShareService', () => {
  let service: ShareService;
  let usersService: UsersService;

  const mockUsersService = {
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      fullName: 'John Doe',
    }),
  };

  const mockMemoriesService = {
    findAllByUserId: jest.fn().mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Some title',
          description: 'Some description',
          media: [{ id: 1, url: 'http://example.com/image.jpg' }],
        },
      ],
      totalPages: 1,
      currentPage: 1,
      totalItems: 1,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShareService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: MemoriesService, useValue: mockMemoriesService },
      ],
    }).compile();

    service = module.get<ShareService>(ShareService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findOne and return user data', async () => {
    const id = 1;
    const result = await service.findOneByUserId(id);

    expect(result).toEqual({
      id: 1,
      fullName: 'John Doe',
    });
    expect(usersService.findOne).toHaveBeenCalledWith(id);
  });

  it('should call findAllMemoriesByUserId and return memory data', async () => {
    const id = 1;
    const page = 1;
    const limit = 10;
    const order = 'DESC';
    const result = await service.findAllMemoriesByUserId(
      id,
      page,
      limit,
      order,
    );

    expect(result).toEqual({
      data: [
        {
          id: 1,
          title: 'Some title',
          description: 'Some description',
          media: [{ id: 1, url: 'http://example.com/image.jpg' }],
        },
      ],
      totalPages: 1,
      currentPage: 1,
      totalItems: 1,
    });
  });
});
