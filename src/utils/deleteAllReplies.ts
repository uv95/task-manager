import { IComment } from "./types";

export const deleteAllReplies = (deletedCommentId: string, ids: string[], entries: Record<string, IComment>) => {
    let result: string[] = [];
    const deleteAll = (deletedCommentId: string, ids: string[], entries: Record<string, IComment>) => {
        result = ids.filter(id => id !== deletedCommentId);
        for (const commentId of result) {
            if(!entries[commentId]?.replyTo) continue;
            if(entries[commentId].replyTo===deletedCommentId) {
                result = result.filter(id => id !== commentId)
                deleteAll(commentId, result, entries)
            } 
        }
        return result
    }
    return deleteAll(deletedCommentId, ids, entries)
}