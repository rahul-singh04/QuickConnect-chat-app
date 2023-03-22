import {createContext,useContext,useReducer,} from "react";
import  UserContext  from "./UserContext";

  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const  obj  = useContext(UserContext);
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
  
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            user: action.payload,
            chatId:                                         //stored combined id in this
            obj.currentUser.uid > action.payload.uid
                ? obj.currentUser.uid + action.payload.uid
                : action.payload.uid + obj.currentUser.uid,
          };
  
        default:
          return state;
      }
    };
  
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };