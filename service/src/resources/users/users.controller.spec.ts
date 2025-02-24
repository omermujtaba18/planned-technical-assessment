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
      findOne: jest.fn(),
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

  describe('update', () => {
    it('should call the service update method with correct parameters', async () => {
      const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };
      const mockReq = { user: { id: 1 } };
      const mockFile = undefined;

      (service.update as jest.Mock).mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        fullName: 'Updated Name',
        profilePicture: null,
      });

      await controller.update(mockReq, mockFile, updateUserDto);

      expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };
      const mockReq = { user: { id: 2 } };
      const mockFile = undefined;

      (service.update as jest.Mock).mockRejectedValue(
        new NotFoundException('User not found'),
      );

      await expect(
        controller.update(mockReq, mockFile, updateUserDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return the updated user', async () => {
      const updateUserDto: UpdateUserDto = { fullName: 'Updated Name' };
      const mockReq = { user: { id: 1 } };
      const mockFile = undefined;

      const updatedUser = {
        id: 1,
        email: 'test@example.com',
        fullName: 'Updated Name',
        profilePicture: null,
      };

      (service.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await controller.update(mockReq, mockFile, updateUserDto);

      expect(result).toEqual(updatedUser);
    });
  });

  describe('get', () => {
    it('should return the user from the service', async () => {
      const mockReq = { user: { id: 1 } };
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        fullName: 'Test User',
        profilePicture: null,
      };

      (service.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.get(mockReq);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const mockReq = { user: { id: 2 } };

      (service.findOne as jest.Mock).mockRejectedValue(
        new NotFoundException('User not found'),
      );

      await expect(controller.get(mockReq)).rejects.toThrow(NotFoundException);
    });
  });
});
