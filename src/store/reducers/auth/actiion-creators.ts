import axios from "axios";
import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import { AuthActionEnum, SetAuthAction, SetErrorAction, SetLoadingAction, SetUserAction } from "./types";



export const AuthActionCreators = {
	setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
	setIsAuth: (auth: boolean): SetAuthAction => ({ type: AuthActionEnum.SET_AUTH, payload: auth }),
	setIsLoading: (payload: boolean): SetLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload }),
	setError: (payload: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload }),
	login: (username: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			dispatch(AuthActionCreators.setIsLoading(true));

			setTimeout(async () => {
				const response = await axios.get<IUser[]>('./users.json');
				// const response = await UserService.getUsers();
				// console.log('login: ~ response', response)
				const mockUser = response.data.find(user => (user.username === username && user.password === password))
				// console.log('login: ~ mockUser', mockUser)
				if (mockUser) {
					localStorage.setItem('auth', 'true')
					localStorage.setItem('username', mockUser.username)
					dispatch(AuthActionCreators.setUser(mockUser))
					dispatch(AuthActionCreators.setIsAuth(true))
				}
				else {
					dispatch(AuthActionCreators.setError('Некорректный логин или пароль'))
				}
				dispatch(AuthActionCreators.setIsLoading(false))
			}, 1000);
		} catch (e) {
			dispatch(AuthActionCreators.setError('Произошла ошибка при логине'))
		}
	},
	logaut: () => async (dispatch: AppDispatch) => {
		localStorage.removeItem('auth');
		localStorage.removeItem('username');
		dispatch(AuthActionCreators.setUser({} as IUser))
		dispatch(AuthActionCreators.setIsAuth(false))
	}
}
