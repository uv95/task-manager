import { IComment } from "./types"

export const countCommentLevel = ({commentId, comments}:{commentId:string, comments: Record<string, IComment>}): number => {
    const replyTo = comments[commentId].replyTo;
    if(!replyTo) return 0  

    return 1 + countCommentLevel({commentId: replyTo, comments})
}
