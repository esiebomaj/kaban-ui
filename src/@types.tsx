export interface TaskType {
  id: string;
  title: string;
  label: string;
  created_at: string;
}

export interface TasksByLabel {
  [key: string]: TaskType[];
}

export interface BoardStateType {
  labels: string[];
  tasks: TasksByLabel;
}
