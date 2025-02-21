import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockUsersService = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    };
    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password if credentials are valid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
      };
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.validateUser(
        'test@example.com',
        'password123',
      );

      expect(result).toEqual({
        id: 1,
        email: 'test@example.com',
        password: undefined,
      });
    });

    it('should return null if user not found', async () => {
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(null);

      const result = await service.validateUser(
        'test@example.com',
        'password123',
      );

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10),
      };
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.validateUser(
        'test@example.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user', async () => {
      const mockUser = { id: 1 };
      (jwtService.sign as jest.Mock).mockReturnValue('mockedAccessToken');

      const result = await service.login(mockUser);

      expect(result).toEqual({
        access_token: 'mockedAccessToken',
        user: mockUser,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: mockUser.id });
    });
  });

  describe('signup', () => {
    it('should create a new user and return access token', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'password123',
      };
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(null);
      (usersService.create as jest.Mock).mockResolvedValue(mockUser);
      (jwtService.sign as jest.Mock).mockReturnValue('mockedAccessToken');

      const result = await service.signup({
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
      });

      expect(result).toEqual({
        access_token: 'mockedAccessToken',
        user: { ...mockUser, password: undefined },
      });
      expect(usersService.findOneByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(usersService.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user already exists', async () => {
      const existingUser = { id: 1, email: 'test@example.com' };
      (usersService.findOneByEmail as jest.Mock).mockResolvedValue(
        existingUser,
      );

      await expect(
        service.signup({
          email: 'test@example.com',
          password: 'password123',
          fullName: 'Test User',
        }),
      ).rejects.toThrow(
        new BadRequestException(
          'Account with the provided email already exists',
        ),
      );
    });
  });
});
