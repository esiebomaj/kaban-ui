import { gql } from "@apollo/client";

export const GET_TASkS = gql`
  query GetTasks {
    labels
    tasks {
      id
      title
      createdAt
      label
    }
  }
`;

export const ADD_TASK_MUTATION = gql`
  mutation AddTask($title: String!, $label: String!) {
    createTask(title: $title, label: $label) {
      task {
        id
        title
        label
        createdAt
      }
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($taskId: String!) {
    deleteTask(taskId: $taskId) {
      success
    }
  }
`;

export const EDIT_TASK_MUTATION = gql`
  mutation EditTask($taskId: String!, $title: String!, $label: String!) {
    editTask(taskId: $taskId, title: $title, label: $label) {
      task {
        id
        title
        label
        createdAt
      }
    }
  }
`;
