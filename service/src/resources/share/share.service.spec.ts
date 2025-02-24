import { Test, TestingModule } from '@nestjs/testing';
import { ShareService } from './share.service';
import { UsersService } from '../users/users.service';

describe('ShareService', () => {
  let service: ShareService;
  let usersService: UsersService;

  const mockUsersService = {
    findOneWithMemories: jest.fn().mockResolvedValue({
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
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShareService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<ShareService>(ShareService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findOneWithMemories and return user data', async () => {
    const id = 1;
    const result = await service.findOne(id);

    expect(result).toEqual({
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
    });
    expect(usersService.findOneWithMemories).toHaveBeenCalledWith(id);
  });
});
