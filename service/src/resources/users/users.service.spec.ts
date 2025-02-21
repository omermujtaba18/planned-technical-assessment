import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './models/users.model';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';

describe('UsersService', () => {
  let service: UsersService;
  let userModelMock: typeof User;

  beforeEach(async () => {
    userModelMock = {
      create: jest.fn(),
      findOne: jest.fn(),
    } as unknown as typeof User;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        profilePicture: null,
      };

      const mockUser = {
        id: 1,
        ...createUserDto,
      };

      (userModelMock.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);

      expect(userModelMock.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user when found', async () => {
      const updateUserDto = { fullName: 'Updated User' };
      const userId = 1;

      const mockUser = {
        id: userId,
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        profilePicture: null,
        update: jest.fn().mockResolvedValue(undefined),
      };

      (userModelMock.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.update(userId, updateUserDto);

      expect(userModelMock.findOne).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(mockUser.update).toHaveBeenCalledWith(updateUserDto);
      expect(result.password).toBeUndefined();
      expect(result).toMatchObject({
        id: userId,
        email: 'test@example.com',
        fullName: 'Test User',
        profilePicture: null,
        password: undefined,
      });
    });

    it('should throw a NotFoundException when user is not found', async () => {
      const userId = 2;
      const updateUserDto = { fullName: 'Updated Name' };

      (userModelMock.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.update(userId, updateUserDto)).rejects.toThrow(
        new NotFoundException('User not found'),
      );
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user when found', async () => {
      const email = 'test@example.com';

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        profilePicture: null,
      };

      (userModelMock.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOneByEmail(email);

      expect(userModelMock.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toEqual(mockUser);
    });

    it('should return null when no user is found', async () => {
      const email = 'notfound@example.com';

      (userModelMock.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.findOneByEmail(email);

      expect(userModelMock.findOne).toHaveBeenCalledWith({ where: { email } });
      expect(result).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should return a user when found', async () => {
      const id = 1;

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
        profilePicture: null,
        update: jest.fn(), // Add this if update is required in other tests
      };

      (userModelMock.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOne(id);

      expect(userModelMock.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(result).toEqual({ ...mockUser, password: undefined });
    });

    it('should throw a NotFoundException when no user is found', async () => {
      const id = 2;

      (userModelMock.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(
        new NotFoundException('User not found'),
      );

      expect(userModelMock.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});
