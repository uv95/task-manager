import { deleteAllReplies } from "../../utils/deleteAllReplies";
import { IComment, NormalizedData } from "../../utils/types";
import { CommentsActions } from "./actions";

const initialState = {
    ids: [],
    entities: {}
}

export const comments = (state:NormalizedData<IComment> = initialState, action: { type: CommentsActions, payload: any }
) => {
    const {type, payload} = action;
    switch (type) {
    case CommentsActions.ADD_COMMENT: {
        return {
            ids: [...state.ids, payload.id],
            entities: {
                ...state.entities,
                [payload.id] : payload
            }
        };
    }
    case CommentsActions.DELETE_COMMENT: {
        const { 
            [payload]: commentToDelete,
            ...otherComments
        } = state.entities;

        const remainingComments = deleteAllReplies(payload, state.ids, state.entities)
        const commentsToDelete = state.ids.filter(id => !remainingComments.includes(id))
 
        let filteredComments = otherComments;
        for (const commentId of commentsToDelete) {
            const { 
                [commentId]: commentToDelete,
                ...otherComments
            } = filteredComments;
            filteredComments = otherComments
        }

        return {
            ids: remainingComments,
            entities: filteredComments
        };
    }
    case CommentsActions.DELETE_ALL_TASK_COMMENTS: {
        let filteredComments = state.entities;
        for (const commentId of payload) {
            const { 
                [commentId]: commentToDelete,
                ...otherComments
            } = filteredComments;
            filteredComments = otherComments
        }
        return {
            ids: state.ids.filter(id => !payload.includes(id)),
            entities: filteredComments
        };
    }
  
    default: {
        return state;
    }
    }
};