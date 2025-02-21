import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;
    jwtAuthGuard = new JwtAuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });

  it('should allow request when SKIP_JWT_AUTH is true', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(true);

    const mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    const result = jwtAuthGuard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith('SKIP_JWT_AUTH', [
      mockContext.getHandler(),
      mockContext.getClass(),
    ]);
  });

  it('should call super.canActivate when SKIP_JWT_AUTH is false', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(false);

    const mockContext = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    const authGuardInstance = new (AuthGuard('jwt'))();
    const authGuardSpy = jest
      .spyOn(authGuardInstance, 'canActivate')
      .mockReturnValue(true);

    jwtAuthGuard['canActivate'] =
      authGuardInstance.canActivate.bind(authGuardInstance);

    const result = jwtAuthGuard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(authGuardSpy).toHaveBeenCalledWith(mockContext);
  });
});
