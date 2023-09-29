import { HtmlHTMLAttributes } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../../store/comments/actions';
import { selectAllComments } from '../../../../store/comments/selector';
import { deleteCommentId } from '../../../../store/tasks/actions';
import { selectCurrentTask } from '../../../../store/tasks/selector';
import { IComment, ITask } from '../../../../utils/types';
import { Button } from '../../../elements/Button';
import './Comment.scss';
    
interface CommentProps extends HtmlHTMLAttributes<HTMLDivElement> {
    width:string
    comment: IComment
    taskId: string
    onReplyToComment: () => void
}
    
export const Comment = ({ width, comment, taskId, onReplyToComment}: CommentProps) => {
    const dispatch = useDispatch();
    const comments = useSelector(selectAllComments)
    const task = useSelector(selectCurrentTask(taskId)) as ITask

    const onDeleteComment = (id:string) => {
        dispatch(deleteComment(id))
        dispatch(deleteCommentId({taskId, commentId: id}))
        
        task.comments.forEach(commentId => !Object.keys(comments).includes(commentId) && dispatch(deleteCommentId({taskId, commentId})))
    }
    return (
        <div className='comment' style={{width}}>
            <div className='comment-author'>{comment.author} <span>{comment.createdAt}</span> <Button className='replyButton' onClick={onReplyToComment}>/Reply</Button></div>
            <p className='comment-text'>{comment.text}</p>
            <Button className='deleteCommentButton' onClick={() => onDeleteComment(comment.id)}>Delete</Button>
        </div>
    );
};