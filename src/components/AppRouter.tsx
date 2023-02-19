import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { privateRoutes, publicRoutes } from '../router';

const AppRouter: FC = () => {
	const { isAuth } = useTypedSelector(state => state.auth)
	
	return (
		isAuth ?
			<Routes>
				{privateRoutes.map(route => {
					const Element = route.component
					return <Route path={route.path} element={<Element />} key={route.path} />
				})}
				<Route path={'*'} element={<Navigate replace to='/' />} />
			</Routes>
			:
			<Routes>
				{publicRoutes.map(route => {
					const Element = route.component
					return <Route path={route.path} element={<Element />} key={route.path} />
				})}
				<Route path={'*'} element={<Navigate replace to='/login' />} />
			</Routes>
	)
}

export default AppRouter
