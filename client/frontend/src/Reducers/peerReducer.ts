import { ADD_PEER, REMOVE_PEER } from "../Actions/peerAction";

export type PeerState = Record<string, {stream: MediaStream}>

type peerAction = {
    type : typeof ADD_PEER,
    payload : {peerId: string , stream : MediaStream}
} | {
    type: typeof REMOVE_PEER,
    payload : {peerId:string}
}

export const peerReducer = (state : PeerState, action: peerAction) =>{
    switch(action.type){
        case ADD_PEER:
            return {
                ...state,
                [action.payload.peerId] : {
                    stream : action.payload.stream
                }
            }
        case REMOVE_PEER:
             const newState = { ...state };
             delete newState[action.payload.peerId];
             return newState;
            
        default:
            return {...state}    
    }
}

