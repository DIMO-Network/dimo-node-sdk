import * as graphqlQueries from './index';
import axios, { AxiosResponse } from 'axios';

// Define the GraphQL query type
type GraphQLQuery = {
  query: string;
  variables?: Record<string, any>;
};

// GraphQL query factory function
const createQueryFactory = (query: string) => {
  return async (variables: Record<string, any>): Promise<AxiosResponse> => {
    try {
      const response = await axios({
        method: 'post',
        url: 'https://your-graphql-endpoint.com',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query,
          variables,
        },
      });
      
      return response;
    } catch (error) {
      console.error('Error executing GraphQL query:', error);
      throw error;
    }
  };
};

// Define your GraphQL query
const query: string = `
  query GetUserInfo($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
    }
  }
`;

// Create a query function
const executeQuery = createQueryFactory(query);

// Make a request using the created query function
executeQuery({ userId: '123' })
  .then((response: AxiosResponse) => {
    console.log('Response:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

