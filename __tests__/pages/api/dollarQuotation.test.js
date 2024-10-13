const { createMocks } = require('node-mocks-http');
const handler = require('../../../pages/api/dollarQuotation').default;

// Mock the fetch utility
jest.mock('../../../utils/fetch', () => ({
  fetchWithRetries: jest.fn()
}));

describe('/api/dollarQuotation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns correct data from primary API', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    const mockApiResponse = {
      ok: true,
      json: () => Promise.resolve({
        value: [{
          cotacaoCompra: 5.4231,
          cotacaoVenda: 5.4237,
          dataHoraCotacao: "2024-08-19 13:10:28.41"
        }]
      })
    };

    require('../../../utils/fetch').fetchWithRetries.mockResolvedValue(mockApiResponse);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        fallback: false,
        value: expect.any(Number),
        date: expect.any(String)
      })
    );
  });

  test('returns fallback data when primary API fails', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    const mockPrimaryApiFailure = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    };

    const mockFallbackApiResponse = {
      ok: true,
      json: () => Promise.resolve({
        "meta": {
            "code": 200,
            "disclaimer": "Usage subject to terms: https://currencybeacon.com/terms"
        },
        "response": {
            "date": "2024-08-19T17:32:42Z",
            "base": "USD",
            "rates": {
                "BRL": 5.39795639
            }
        },
        "date": "2024-08-19T17:32:42Z",
        "base": "USD",
        "rates": {
            "BRL": 5.39795639
        }
      })
    };

    require('../../../utils/fetch').fetchWithRetries
      .mockResolvedValueOnce(mockPrimaryApiFailure)
      .mockResolvedValueOnce(mockFallbackApiResponse);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        fallback: true,
        value: expect.any(Number),
        date: expect.any(String)
      })
    );
  });

  test('returns 500 when both APIs fail', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });

    const mockApiFailure = {
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    };

    require('../../../utils/fetch').fetchWithRetries.mockResolvedValue(mockApiFailure);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });

  test('returns empty value for two dates straight and valid response for 3rd day: primary API', async () => {
    const { req, res } = createMocks({
        method: 'GET',
    });
      
    const mockApiResponseEmpty = {
        ok: true,
        json: () => Promise.resolve({
            value: []
        })
    };

    const mockApiResponseValid = {
        ok: true,
        json: () => Promise.resolve({
            value: [{
            cotacaoCompra: 5.4231,
            cotacaoVenda: 5.4237,
            dataHoraCotacao: "2024-08-19 13:10:28.41"
            }]
        })
    };

    require('../../../utils/fetch').fetchWithRetries
    .mockResolvedValueOnce(mockApiResponseEmpty)
    .mockResolvedValueOnce(mockApiResponseEmpty)
    .mockResolvedValueOnce(mockApiResponseValid);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
            fallback: false,
            value: expect.any(Number),
            date: expect.any(String)
        })
    );
  });

  test('returns empty value for 3 dates straight, triggers fallback', async () => {
    const { req, res } = createMocks({
        method: 'GET',
    });
      
    const mockApiResponseEmpty = {
        ok: true,
        json: () => Promise.resolve({
            value: []
        })
    };

    const mockApiResponseValid = {
        ok: true,
        json: () => Promise.resolve({
          "meta": {
              "code": 200,
              "disclaimer": "Usage subject to terms: https://currencybeacon.com/terms"
          },
          "response": {
              "date": "2024-08-19T17:32:42Z",
              "base": "USD",
              "rates": {
                  "BRL": 5.39795639
              }
          },
          "date": "2024-08-19T17:32:42Z",
          "base": "USD",
          "rates": {
              "BRL": 5.39795639
          }
        })
    };

    require('../../../utils/fetch').fetchWithRetries
    .mockResolvedValueOnce(mockApiResponseEmpty)
    .mockResolvedValueOnce(mockApiResponseEmpty)
    .mockResolvedValueOnce(mockApiResponseEmpty)
    .mockResolvedValueOnce(mockApiResponseValid);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
            fallback: true,
            value: expect.any(Number),
            date: expect.any(String)
        })
    );
  });

});