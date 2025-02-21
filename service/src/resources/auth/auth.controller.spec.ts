import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupAuthDto } from './dto/signup-auth.dto';
import { SigninAuthDto } from './dto/signin-auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      login: jest.fn(),
      signup: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token and user on successful login', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      const mockToken = { access_token: 'mockedAccessToken', user: mockUser };

      (authService.login as jest.Mock).mockResolvedValue(mockToken);

      const req = { user: mockUser };
      const loginDto: SigninAuthDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const result = await controller.login(req, loginDto);

      expect(result).toEqual(mockToken);
      expect(authService.login).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('signup', () => {
    it('should create a new user and return access token', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      const mockToken = { access_token: 'mockedAccessToken', user: mockUser };

      (authService.signup as jest.Mock).mockResolvedValue(mockToken);

      const signupDto: SignupAuthDto = {
        email: 'test@example.com',
        password: 'password123',
        fullName: 'Test User',
      };

      const result = await controller.signup(signupDto);

      expect(result).toEqual(mockToken);
      expect(authService.signup).toHaveBeenCalledWith(signupDto);
    });
  });
});
