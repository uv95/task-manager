import { RootState } from "..";

export const selectAllComments = (state:RootState) => state.comments.entities
