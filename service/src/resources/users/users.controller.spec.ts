import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service update method with correct parameters', async () => {
    const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };
    const userId = '1';

    (service.update as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      fullName: 'Updated Name',
      profilePicture: null,
    });

    await controller.update(userId, updateUserDto);

    expect(service.update).toHaveBeenCalledWith(+userId, updateUserDto);
  });

  it('should throw 404 error if user not found', async () => {
    const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };
    const userId = '2';

    (service.update as jest.Mock).mockRejectedValue(
      new NotFoundException('User not found'),
    );

    await expect(controller.update(userId, updateUserDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return the updated user', async () => {
    const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };
    const userId = '1';

    (service.update as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      fullName: 'Updated Name',
      profilePicture: null,
    });

    const result = await controller.update(userId, updateUserDto);

    expect(result).toEqual({
      id: 1,
      email: 'test@example.com',
      fullName: 'Updated Name',
      profilePicture: null,
    });
  });
});
