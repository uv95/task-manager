import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addComment } from '../../../../store/comments/actions';
import { selectAllComments } from '../../../../store/comments/selector';
import { addCommentId } from '../../../../store/tasks/actions';
import { countCommentLevel } from '../../../../utils/countCommentLevel';
import { sortComments } from '../../../../utils/sortComments';
import { IComment } from '../../../../utils/types';
import { Button } from '../../../elements/Button';
import { ButtonTheme } from '../../../elements/Button/ui/Button';
import { Comment } from '../../Comment/ui/Comment';
import './CommentsList.scss';
    
interface CommentsListProps {
    comments: string[]
    taskId:string
}
    
export const CommentsList = ({ comments, taskId }: CommentsListProps) => {
    const dispatch = useDispatch();
    const commentsEntities = useSelector(selectAllComments)
    const sortedComments = sortComments(comments, commentsEntities)

    const [replyToComment, setReplyToComment] = useState('')
    const [newComment, setNewComment] = useState<IComment>({
        id: '',
        author: 'John Smith',
        text: '',
        createdAt: '',
        replyTo: '',
        taskId
    })
    const [newReply, setNewReply] = useState<IComment>({
        id: '',
        author: 'John Smith',
        text: '',
        createdAt: '',
        replyTo: '',
        taskId
    })

    const onChange =(e:ChangeEvent<HTMLInputElement>) => {
        setNewComment({
            ...newComment,
            text: e.target.value
        })
    }
    const onChangeReply =(e:ChangeEvent<HTMLInputElement>) => {
        setNewReply({
            ...newComment,
            text: e.target.value
        })
    }

    const resetInputs = () => {
        setNewComment({...newComment, text: ''})
        setNewReply({...newReply, text: ''})
        setReplyToComment('')
    }

    const getCommentWidth = (comment:IComment) => !comment.replyTo ? '100%' : (100 - (10 * countCommentLevel({commentId: comment.id, comments: commentsEntities})) + '%')

    const onAddComment = (replyTo: string) => {
        const newCommentId = uuidv4()
        dispatch(addComment({...(replyTo ? newReply : newComment), id: newCommentId, replyTo, createdAt: new Date(Date.now()).toLocaleDateString()}))
        dispatch(addCommentId({taskId, commentId: newCommentId}))
        resetInputs()
    }
    
    return (
        <div className='commentsList'>
            <h3>Comments ({sortedComments.length})</h3>
            {sortedComments.map((comment: IComment) => (
                <div key={comment.id}>
                    <Comment comment={comment} taskId={taskId} width={getCommentWidth(comment)} onReplyToComment={() => setReplyToComment(comment.id)} />

                    { replyToComment === comment.id &&
                    <div className="input" style={{width: getCommentWidth(comment)}} >
                        <input type="text" placeholder='Type your comment...' value={newReply.text} onChange={onChangeReply}/>

                        <Button theme={ButtonTheme.PRIMARY} disabled={newReply.text===''} onClick={() => onAddComment(replyToComment)}>Send</Button>

                        <Button theme={ButtonTheme.OUTLINE} onClick={resetInputs}>Cancel</Button>
                    </div>}
                </div>
            ))}

            <div className="input">
                <input type="text" placeholder='Type your comment...' value={newComment.text} onChange={onChange}/>
                
                <Button theme={ButtonTheme.PRIMARY} disabled={newComment.text===''} onClick={() => onAddComment('')}>Send</Button>
            </div>
        </div>
    );
};