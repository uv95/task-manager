export interface IProject {
    id: string,
    title: string,
    tasks: string[]
}

export interface ITask {
    id: string,
    title: string,
    description: string,
    starts: string,
    timeInDevelopment: string,
    ends: string,
    priority: PriorityTypes,
    files?: string,
    status: Status,
    subtasks: ISubtask[],
    comments: string[],
}

export interface ISubtask {
    text: string,
    isDone: boolean
}

export interface IComment {
    id: string,
    text: string,
    comment: string,
    task: ITask[]
}

export enum Status {
  QUEUE = 'Queue',
  DEVELOPMENT = 'Development',
  DONE = 'Done',
}

export enum PriorityTypes {
   HIGH = 'High',
   MEDIUM = 'Medium',
   LOW = 'Low',
}

export interface NormalizedData<T> {
    ids: string[],
    entities: Record<string, T>
}
