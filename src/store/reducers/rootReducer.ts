import { AnyAction, applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import authReducer from './authReducer/authReducer';
import productReducer from './productReducer/productReducer';
import uiReducer from './uiReducer/uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  ui: uiReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reduxDevToolsEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // @ts-expect-error TBF after redux upgrade
        trace: true,
      })
    : null || compose;

export const rootStore = createStore(rootReducer, reduxDevToolsEnhancer(applyMiddleware(thunk)));

type IRootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TypedDispatch = ThunkDispatch<IRootState, unknown, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();

// It is the same as ThunkAction type from redux-thunk but extraArgument is optional
export type TypedThunkAction = (
  dispatch: ThunkDispatch<IRootState, unknown, AnyAction>,
  getState: () => IRootState,
  extraArgument?: unknown,
) => unknown;

export default rootReducer;
