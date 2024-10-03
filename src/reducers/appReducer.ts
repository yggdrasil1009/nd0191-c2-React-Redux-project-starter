import { Action } from "redux";
import { VOTE_ON_POLL, ADD_POLL } from "../actions/action";
import { LOGIN_SUCCESS, LOGOUT } from "../actions/action";
import { Question, User } from "database/_DATA";

// Define the state structure
export interface AppState {
  auth: {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
  };
  polls: {
    [id: string]: Question;
  };
}

// Define the initial state for both authentication and poll-related state
const initialState: AppState = {
  auth: {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  },
  polls: {},
};

interface VoteOnPollAction extends Action<typeof VOTE_ON_POLL> {
  payload: {
    updatedPoll: Question;
    updatedUser: User;
  };
}

interface AuthAction extends Action {
  type: typeof LOGIN_SUCCESS | typeof LOGOUT;
  payload?: any;
}

interface AddPollAction extends Action<typeof ADD_POLL> {
  payload: Question;
}

export const appReducer = (
  state = initialState,
  action: VoteOnPollAction | AuthAction | AddPollAction
): AppState => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const { user } = action.payload;
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          user,
          error: null,
        },
      };
    }
    case LOGOUT: {
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: false,
          user: null,
          error: null,
        },
      };
    }
    case VOTE_ON_POLL: {
      const { updatedPoll, updatedUser } = action.payload;

      return {
        ...state,
        polls: {
          ...state.polls,
          [updatedPoll.id]: updatedPoll, // Update the poll with the new vote
        },
        auth: {
          ...state.auth,
          user: updatedUser, // Update the user with their new vote
        },
      };
    }
    case ADD_POLL: {
      const newPoll = action.payload;

      return {
        ...state,
        polls: {
          ...state.polls,
          [newPoll.id]: newPoll, // Add the new poll to the polls list
        },
      };
    }
    default:
      return state;
  }
};
