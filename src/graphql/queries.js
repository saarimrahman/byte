/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      datetime
      type
      headline
      short_summary
      long_summary
      full_text
      url
      picture_url
      tags
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        datetime
        type
        headline
        short_summary
        long_summary
        full_text
        url
        picture_url
        tags
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      admin
      date_created
      username
      email
      salt
      password
      birthday
      location
      gender
      industry
      profession
      picture_url
      interests
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        admin
        date_created
        username
        email
        salt
        password
        birthday
        location
        gender
        industry
        profession
        picture_url
        interests
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
