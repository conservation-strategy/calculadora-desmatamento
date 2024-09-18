const { fetchWithRetries } = require('../../utils/fetch');
/*fetchWithRetries should export as module.exports for test suite */

global.fetch = jest.fn();

describe('fetchWithRetries', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('successful fetch on first try', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: '12345' })
        });

        const response = await fetchWithRetries('https://api.example.com/data', 3);
        const data = await response.json();

        expect(data).toEqual({ data: '12345' });
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('fails first call, succeeds on second', async () => {
        global.fetch
            .mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error'
            })
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ data: 'success' })
            });

        const response = await fetchWithRetries('https://api.example.com/data', 3);
        const data = await response.json();

        expect(data).toEqual({ data: 'success' });
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    test('fails first three calls, succeeds on fourth', async () => {
        const errorResponse = {
            ok: false,
            status: 500,
            statusText: 'Internal Server Error'
        };

        global.fetch
            .mockResolvedValueOnce(errorResponse)
            .mockResolvedValueOnce(errorResponse)
            .mockResolvedValueOnce(errorResponse)
            .mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({ data: 'success on fourth try' })
            });

        const response = await fetchWithRetries('https://api.example.com/data', 3);
        const data = await response.json();

        expect(data).toEqual({ data: 'success on fourth try' });
        expect(global.fetch).toHaveBeenCalledTimes(4);
    }, 10000);
});