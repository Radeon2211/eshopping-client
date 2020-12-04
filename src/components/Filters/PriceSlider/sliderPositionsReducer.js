import { updateObject } from '../../../shared/utility';
import { sliderPositionsActions } from '../../../shared/constants';

export const sliderPositionsInitialState = {
  left: 0,
  right: 0,
};

export const sliderPositionsReducer = (state = sliderPositionsInitialState, action) => {
  switch (action.type) {
    case sliderPositionsActions.SET_BOTH:
      return { ...action.payload };
    case sliderPositionsActions.SET_LEFT:
      return updateObject(state, { left: action.left });
    case sliderPositionsActions.SET_RIGHT:
      return updateObject(state, { right: action.right });
    default:
      return state;
  }
};
