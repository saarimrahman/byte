/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
