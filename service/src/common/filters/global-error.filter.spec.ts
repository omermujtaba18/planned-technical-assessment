import { Test, TestingModule } from '@nestjs/testing';
import { ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { GlobalErrorFilter } from './global-error.filter';

describe('UnhandledErrorFilter', () => {
  let filter: GlobalErrorFilter;
  let logger: Logger;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GlobalErrorFilter,
        {
          provide: Logger,
          useValue: { error: jest.fn() },
        },
      ],
    }).compile();

    filter = moduleRef.get<GlobalErrorFilter>(GlobalErrorFilter);
    logger = moduleRef.get<Logger>(Logger);
  });

  it('should log the error and send a 500 response', () => {
    const exception = new Error('Test error');
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnThis(),
      getResponse: jest.fn().mockReturnValue(mockResponse),
    } as unknown as ArgumentsHost;

    filter.catch(exception, mockArgumentsHost);

    expect(logger.error).toHaveBeenCalledWith('Test error', {
      stack: exception.stack,
      error: exception,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: 'Something went wrong!',
      error: 'Unknown error',
      statusCode: 500,
    });
  });
});
