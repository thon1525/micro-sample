import * as connection from '@notifications/queues/connection';
import { consumeAuthEmailMessages } from '@notifications/queues/email-consumer';
import amqp from 'amqplib';

jest.mock('@notifications/queues/connection');
jest.mock('amqplib');

describe('Email Consumer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('consumeAuthEmailMessage', () => {
    it('should be called ', async () => {
      const channel = {
        assertExchange: jest.fn(),
        publish: jest.fn(),
        assertQueue: jest.fn(),
        bindQueue: jest.fn(),
        consume: jest.fn(),
      };

      jest.spyOn(channel, 'assertExchange');
      jest.spyOn(channel, 'assertQueue').mockReturnValue({
        queue: 'auth-email-queue',
        messageCount: 0,
        consumerCount: 0,
      });
      jest
        .spyOn(connection, 'createQueueConnection')
        .mockReturnValue(channel as never);

      const connectionChannel: amqp.Channel | undefined =
        await connection.createQueueConnection();
      await consumeAuthEmailMessages(connectionChannel!);

      expect(connectionChannel!.assertExchange).toHaveBeenCalledWith(
        'microsample-email-notification',
        'direct'
      );
      expect(connectionChannel!.assertQueue).toHaveBeenCalledTimes(1);
      expect(connectionChannel!.bindQueue).toHaveBeenCalledWith(
        'auth-email-queue',
        'microsample-email-notification',
        'auth-email'
      );
    });
  });
});
