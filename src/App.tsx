import { Layout } from 'antd';
import { FC, useEffect } from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import 'antd/dist/reset.css'
import './App.css';
import { useActions } from './hooks/useActions';
import { IUser } from './models/IUser';

const App: FC = () => {
	const { setUser, setIsAuth } = useActions();
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			setUser({ username: localStorage.getItem('username' || '') } as IUser)
			setIsAuth(true)
		}
	}, [])

	return (
		<Layout>
			<Navbar />
			<Layout.Content>
				<AppRouter />
			</Layout.Content>
		</Layout>
	);
}

export default App;
