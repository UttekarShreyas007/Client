import * as types from './types';
import propertyService from '../../services/propertyService';

// Action creator for setting the loading state
export const setLoading = () => {
  return {
    type: types.SET_LOADING
  };
};

// Action creator for setting the error state
export const setError = error => {
  return {
    type: types.SET_ERROR,
    payload: error
  };
};

// Action creator for getting all properties
export const getProperties = () => async dispatch => {
  try {
    dispatch(setLoading());
    const properties = await propertyService.getProperties();
    dispatch({
      type: types.GET_PROPERTIES,
      payload: properties
    });
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

// Action creator for getting a single property by id
export const getPropertyById = id => async dispatch => {
  try {
    dispatch(setLoading());
    const property = await propertyService.getPropertyById(id);
    dispatch({
      type: types.GET_PROPERTY_BY_ID,
      payload: property
    });
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

// Action creator for adding a new property
export const addProperty = formData => async dispatch => {
  try {
    dispatch(setLoading());
    const newProperty = await propertyService.addProperty(formData);
    dispatch({
      type: types.ADD_PROPERTY,
      payload: newProperty
    });
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

// Action creator for updating an existing property
export const updateProperty = (id, formData) => async dispatch => {
  try {
    dispatch(setLoading());
    const updatedProperty = await propertyService.updateProperty(id, formData);
    dispatch({
      type: types.UPDATE_PROPERTY,
      payload: updatedProperty
    });
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

// Action creator for deleting a property
export const deleteProperty = id => async dispatch => {
  try {
    dispatch(setLoading());
    await propertyService.deleteProperty(id);
    dispatch({
      type: types.DELETE_PROPERTY,
      payload: id
    });
  } catch (error) {
    dispatch(setError(error.response.data));
  }
};

