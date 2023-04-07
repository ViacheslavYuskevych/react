import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { IAppDispatch, IAppState } from '../redux/store';

export const useAppDispatch = () => useDispatch<IAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<IAppState> = useSelector;
