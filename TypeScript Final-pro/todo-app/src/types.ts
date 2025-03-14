export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
  }
  
  export interface Quote {
    content: string;
    author: string;
  }