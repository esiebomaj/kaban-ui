export interface TaskType {
  id: string;
  title: string;
  label: string;
  createdAt: string;
  priority: number;
  boardId: string;
}

export interface TasksByLabel {
  [key: string]: TaskType[];
}

export interface BoardStateType {
  labels: string[];
  tasks: TasksByLabel;
}
