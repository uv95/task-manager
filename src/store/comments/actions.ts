import { IComment } from '../../utils/types'

export enum CommentsActions {
    ADD_COMMENT = '@@comment/ADD_COMMENT',
    DELETE_COMMENT = '@@comment/DELETE_COMMENT',
    DELETE_ALL_TASK_COMMENTS = '@@comment/DELETE_ALL_TASK_COMMENTS ',
}

export const addComment = (comment: IComment) => ({
    type: CommentsActions.ADD_COMMENT,
    payload: comment
})

export const deleteComment = (id:string) => ({
    type: CommentsActions.DELETE_COMMENT,
    payload: id
})

export const deleteAllTaskComments = (commentsIds:string[]) => ({
    type: CommentsActions.DELETE_ALL_TASK_COMMENTS,
    payload: commentsIds
})