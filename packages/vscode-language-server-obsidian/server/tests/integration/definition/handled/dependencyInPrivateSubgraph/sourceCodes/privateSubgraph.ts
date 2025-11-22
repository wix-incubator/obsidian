import { graph, ObjectGraph, provides } from 'react-obsidian';

export type HttpClient = {
  fetch: (url: string) => {
    response: {
      status: number;
    };
  };
};

export type Config = {
  baseUrl: string;
};

@graph()
export class PrivateSubgraph extends ObjectGraph {
  @provides()
  httpClient(config: Config): HttpClient {
    return {
      fetch: (url: string) => ({
        url: `${config.baseUrl}${url}`,
        response: {
          status: 200,
        },
      }),
    };
  }

  @provides()
  config(): Config {
    return {
      baseUrl: 'https://api.example.com/',
    };
  }
}

