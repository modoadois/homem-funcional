
export interface TaskStep {
  id: number;
  title: string;
  desc: string;
  icon: string;
}

export interface Medal {
  icon: string;
  label: string;
  color: string;
  requirement: {
    type: 'tasks' | 'streak';
    value: number;
  };
  description?: string;
}

export interface UserStats {
  minutesFocused: number;
  streak: number;
  tasksCompleted: number;
}
