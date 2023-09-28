import { HtmlHTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from '../../../../store/comments/actions';
import { deleteCommentId } from '../../../../store/tasks/actions';
import { IComment } from '../../../../utils/types';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import './Comment.scss';
    
interface CommentProps extends HtmlHTMLAttributes<HTMLDivElement> {
    width:string
    comment: IComment
    taskId: string
    onReplyToComment: () => void
}
    
export const Comment = ({ width, comment, taskId, onReplyToComment}: CommentProps) => {
    const dispatch = useDispatch();

    const onDeleteComment = (id:string) => {
        dispatch(deleteComment(id))
        dispatch(deleteCommentId({taskId, commentId: id}))
    }
    return (
        <div className='comment' style={{width}}>
            <div className='author'>{comment.author} <span>{comment.createdAt}</span> <Button className='replyButton' theme={ButtonTheme.CLEAR} onClick={onReplyToComment}>/Reply</Button></div>
            <p>{comment.text}</p>
            <Button className='deleteCommentButton' theme={ButtonTheme.CLEAR} onClick={() => onDeleteComment(comment.id)}>Delete</Button>
        </div>
    );
};