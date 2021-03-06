import { Client } from '../src';

describe('jmap-client-ts unittests', () => {
  const mockTransportGet = jest.fn();
  const mockTransportPost = jest.fn();
  const mockTransport = { get: mockTransportGet, post: mockTransportPost };

  const accountId = '123456789abcdef';

  mockTransport.get = mockTransportGet;
  mockTransport.post = mockTransportPost;

  const client = new Client({
    sessionUrl: 'session-url',
    accessToken: '',
    httpHeaders: {},
    overriddenApiUrl: 'api-url',
    transport: mockTransport,
  });

  beforeEach(async () => {
    mockTransportGet.mockClear();
    mockTransportPost.mockClear();
  });

  it('email submission set request is correct', () => {
    mockTransportPost.mockReturnValueOnce(
      Promise.resolve({
        methodResponses: [[null, null]],
      }),
    );

    const emailId = '123456789email';

    client.emailSubmission_set({
      accountId: accountId,
      create: {
        random: {
          emailId: emailId,
        },
      },
      onSuccessUpdateEmail: {
        random: {
          something: null,
        },
      },
      onSuccessDestroyEmail: ['a'],
    });

    expect(mockTransportPost.mock.calls[0][1].methodCalls).toStrictEqual([
      [
        'EmailSubmission/set',
        {
          accountId: accountId,
          create: {
            random: {
              emailId: emailId,
            },
          },
          onSuccessUpdateEmail: {
            random: {
              something: null,
            },
          },
          onSuccessDestroyEmail: ['a'],
        },
        '0',
      ],
    ]);
  });

  it('email submission get request is correct', () => {
    mockTransportPost.mockReturnValueOnce(
      Promise.resolve({
        methodResponses: [[null, null]],
      }),
    );

    const ids = ['random-id1', 'random-id2'];

    client.emailSubmission_get({
      accountId: accountId,
      ids: ids,
    });

    expect(mockTransportPost.mock.calls[0][1].methodCalls).toStrictEqual([
      [
        'EmailSubmission/get',
        {
          accountId: accountId,
          ids: ids,
        },
        '0',
      ],
    ]);
  });

  it('email submission changes request is correct', () => {
    mockTransportPost.mockReturnValueOnce(
      Promise.resolve({
        methodResponses: [[null, null]],
      }),
    );

    client.emailSubmission_changes({
      accountId: accountId,
      sinceState: 'state1',
    });

    expect(mockTransportPost.mock.calls[0][1].methodCalls).toStrictEqual([
      [
        'EmailSubmission/changes',
        {
          accountId: accountId,
          sinceState: 'state1',
        },
        '0',
      ],
    ]);
  });
});
