export interface IProject {
    id: string,
    title: string,
    tasks: string[]
}

export interface ITask {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    timeInProgress: string,
    completedAt?: Date,
    priority: Priority,
    files?: string,
    status: Status,
    subtasks?: string[],
    comments?: string[],
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

export enum Priority {
   HIGH = 'High',
   MEDIUM = 'Medium',
   LOW = 'Low',
}

export interface NormalizedData<T> {
    ids: string[],
    entities: Record<string, T>
}


export const mockTasks: NormalizedData<ITask> = { 
    ids: ['1', '2'],
    entities: {
        '1' : {
            id: '1',
            title: 'First Task',
            description: 'text text text',
            createdAt: new Date(),
            timeInProgress: '2 days',
            priority: Priority.HIGH,
            status: Status.DEVELOPMENT,
            comments: [
                '3'
            ],
        },
        '2' :  {
            id: '2',
            title: 'Second Task',
            description: 'text text text',
            createdAt: new Date(),
            timeInProgress: '2 days',
            completedAt: new Date(),
            priority: Priority.LOW,
            status: Status.DONE,
            subtasks: [
                'Do this', 'Do that'
            ],
            comments: [
                '1', '2'
            ],
        }
    }
}

export const mockProjects: NormalizedData<IProject> = { 
    ids: ['1'],
    entities: {
        '1' : {
            id: '1',
            title: 'First Project',
            tasks: ['1', '2']
        },
    }
}