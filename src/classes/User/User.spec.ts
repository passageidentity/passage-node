import { User } from './User';
import { PassageInstanceConfig } from '../PassageBase';
import { UsersApi, UserDevicesApi, ResponseError, ListPaginatedUsersResponse } from '../../generated';
import { PassageUser } from './types';
import { PassageError } from '../PassageError';
import apiConfiguration from '../../utils/apiConfiguration';

jest.mock('../../generated/apis');

const mockConfig: PassageInstanceConfig = {
    apiConfiguration: apiConfiguration({ accessToken: 'mock_api_key' }),
    appId: 'test-app-id',
};

describe('User class', () => {
    let user: User;
    let usersApiMock: jest.Mocked<UsersApi>;
    let userDevicesApiMock: jest.Mocked<UserDevicesApi>;

    beforeEach(() => {
        usersApiMock = new UsersApi(mockConfig.apiConfiguration) as jest.Mocked<UsersApi>;
        userDevicesApiMock = new UserDevicesApi(mockConfig.apiConfiguration) as jest.Mocked<UserDevicesApi>;

        user = new User(mockConfig);
        user['usersApi'] = usersApiMock;
        user['userDevicesApi'] = userDevicesApiMock;
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
        usersApiMock.listPaginatedUsers.mockRejectedValue(
            new ResponseError(
                {
                    status: 404,
                    json: async () => ({ code: 'NOT_FOUND', error: 'Resource not found' }),
                } as Response,
                'Error',
            ),
        );
        await expect(user.getByIdentifier('email@example.com')).rejects.toThrow(PassageError);
        await expect(user.getByIdentifier('email@example.com')).rejects.toThrow(
            'Could not fetch user by identifier: Resource not found',
        );
    });

    it('should throw an error if get user by identifier returns an empty array', async () => {
        usersApiMock.listPaginatedUsers.mockResolvedValue({ users: [] } as unknown as ListPaginatedUsersResponse);
        await expect(user.getByIdentifier('email@example.com')).rejects.toThrow(PassageError);
        await expect(user.getByIdentifier('email@example.com')).rejects.toThrow(
            'Could not find user with that identifier.',
        );
    });
});
