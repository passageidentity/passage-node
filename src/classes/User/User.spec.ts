import { User } from './User';
import { PassageInstanceConfig } from '../PassageBase';
import { UsersApi, ResponseError, ListPaginatedUsersResponse, Configuration } from '../../generated';
import { PassageUser } from './types';
import { PassageError } from '../PassageError';

jest.mock('../../generated/apis');

const mockConfig: PassageInstanceConfig = {
    apiConfiguration: new Configuration({ accessToken: 'mock_api_key' }),
    appId: 'test-app-id',
};

describe('User class', () => {
    let user: User;
    let usersApiMock: jest.Mocked<UsersApi>;

    beforeEach(() => {
        usersApiMock = new UsersApi(mockConfig.apiConfiguration) as jest.Mocked<UsersApi>;

        user = new User(mockConfig);
        // @ts-ignore
        user['usersApi'] = usersApiMock;
    });

    it('should get a user by identifier', async () => {
        const mockUser: PassageUser = { id: 'user-id' } as PassageUser;
        usersApiMock.listPaginatedUsers.mockResolvedValue({
            users: [mockUser],
        } as unknown as ListPaginatedUsersResponse);
        usersApiMock.getUser.mockResolvedValue({ user: mockUser });

        const result = await user.getByIdentifier('email@example.com');
        expect(result).toEqual(mockUser);
        expect(usersApiMock.listPaginatedUsers).toHaveBeenCalledWith({
            appId: 'test-app-id',
            limit: 1,
            identifier: 'email@example.com',
        });
    });

    it('should throw an error if get user by identifier fails', async () => {
        const responseError = new ResponseError(
            {
                status: 502,
                json: async () => ({ code: 'error_code', error: 'Bad gateway' }),
            } as Response,
            'Error',
        );
        const passageError = await PassageError.fromResponseError(responseError);
        usersApiMock.listPaginatedUsers.mockRejectedValue(responseError);

        await expect(user.getByIdentifier('email@example.com')).rejects.toThrow(passageError);
        await expect(user.getByIdentifier('email@example.com')).rejects.toThrow('Bad gateway');
    });

    it('should throw an error if get user by identifier returns an empty array', async () => {
        const passageError = await PassageError.fromResponseError(
            new ResponseError(
                {
                    status: 404,
                    json: async () => ({ code: 'user_not_found', error: 'User not found.' }),
                } as Response,
                'Error',
            ),
        );

        usersApiMock.listPaginatedUsers.mockResolvedValue({ users: [] } as unknown as ListPaginatedUsersResponse);
        await expect(user.getByIdentifier('email@example.com')).rejects.toThrow(passageError);
        await expect(user.getByIdentifier('email@example.com')).rejects.toThrow('User not found.');
    });
});
