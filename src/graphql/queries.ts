import { gql } from "@apollo/client";

export const GET_TASkS = gql`
  query GetTasks($boardId: String!, $sortBy: String!) {
    labels
    tasks(boardId: $boardId, sortBy: $sortBy) {
      id
      title
      createdAt
      label
      boardId
      priority
    }
  }
`;

export const ADD_TASK_MUTATION = gql`
  mutation AddTask($boardId: String!, $title: String!, $label: String!) {
    createTask(boardId: $boardId, title: $title, label: $label) {
      task {
        id
        title
        label
        createdAt
        boardId
        priority
      }
    }
  }
`;

export const EDIT_TASK_MUTATION = gql`
  mutation EditTask(
    $boardId: String!
    $taskId: String!
    $title: String!
    $label: String!
  ) {
    editTask(boardId: $boardId, taskId: $taskId, title: $title, label: $label) {
      task {
        id
        title
        label
        createdAt
        boardId
        priority
      }
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($boardId: String!, $taskId: String!) {
    deleteTask(boardId: $boardId, taskId: $taskId) {
      success
    }
  }
`;

export const REORDER_TASK_MUTATION = gql`
  mutation ReorderTask($boardId: String!, $taskId: String!, $priority: Int!) {
    reorderTask(boardId: $boardId, taskId: $taskId, priority: $priority) {
      success
    }
  }
`;
