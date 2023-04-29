import {
  GET_PROPERTIES,
  GET_PROPERTY,
  ADD_PROPERTY,
  UPDATE_PROPERTY,
  DELETE_PROPERTY,
  PROPERTY_ERROR,
  SET_LOADING,
  SET_USER,
  SET_ERROR,
  RESET_PROPERTIES,
} from "../actions/types";

const initialState = {
  properties: [],
  property: null,
  loading: false,
  user: null,
  error: null,
};

export default function propertyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROPERTIES:
      return {
        ...state,
        properties: action.payload,
        loading: false,
        error: null,
      };
    case GET_PROPERTY:
      return {
        ...state,
        property: action.payload,
        loading: false,
        error: null,
      };
    case ADD_PROPERTY:
      return {
        ...state,
        properties: [action.payload, ...state.properties],
        loading: false,
        error: null,
      };
    case UPDATE_PROPERTY:
      return {
        ...state,
        properties: state.properties.map((property) =>
          property.id === action.payload.id ? action.payload : property
        ),
        loading: false,
        error: null,
      };
    case DELETE_PROPERTY:
      return {
        ...state,
        properties: state.properties.filter(
          (property) => property.id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case PROPERTY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case RESET_PROPERTIES:
      return {
        ...state,
        properties: [],
        property: null,
        loading: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
}
