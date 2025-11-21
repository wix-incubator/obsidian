import { graph, ObjectGraph, provides } from '../../src';

export type HttpClient = {
  fetch: (url: string) => {
    response: {
      status: number;
    };
  };
}

@graph()
export class PrivateSubgraph extends ObjectGraph {
  @provides()
  httpClient(baseUrl: string): HttpClient {
    return {
      fetch: (url: string) => ({
        url: `${baseUrl}${url}`,
        response: {
          status: 200,
        },
      }),
    };
  }

  @provides()
  config() {
    return {
      baseUrl: 'https://api.example.com/',
    };
  }  
}

