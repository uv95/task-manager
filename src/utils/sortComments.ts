import { IComment } from "./types";

export const sortComments = (ids: string[], entities: Record<string, IComment>): IComment[] => {
    let result:IComment[] = []
    const ferstLevelComments = Object.values(entities).filter(({id}) => ids.includes(id)).filter(comment => !comment.replyTo); 
    if(ferstLevelComments.length === ids.length) return ferstLevelComments;

    const filterComments = (id:string) => {
        result = [...result, entities[id]]; 
        const replies = Object.values(entities).filter(comment => comment.replyTo === id) 

        if(replies.length) replies.forEach(c => filterComments(c.id))
        
    }
    
    ferstLevelComments.forEach(c => filterComments(c.id))

    return result
}