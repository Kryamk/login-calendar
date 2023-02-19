import React, { FC } from 'react'
import { Layout, Menu, Row } from 'antd'
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
// import { useDispatch } from 'react-redux';
// import { AuthActionCreators } from '../store/reducers/auth/actiion-creators';
// import { Dispatch } from 'redux';
import { useActions } from '../hooks/useActions';

const Navbar: FC = () => {
	const { isAuth, user } = useTypedSelector(state => state.auth)
	const navigate = useNavigate();
	// const dispatch:Dispatch<any> = useDispatch();
	const {logaut} = useActions()

	const itemsPrivate: MenuProps['items'] = [
		{ label: 'Выйти', key: 'logout' },
	]
	const itemsPublic: MenuProps['items'] = [
		{ label: 'Login', key: 'login' },
	]

	const clickMenu: MenuProps['onClick'] = (e) => {
		if (e.key === 'login') {
			console.log('login')
			navigate('/login')
		}
		else if(e.key === 'logout') {
			// dispatch(AuthActionCreators.logaut())
			logaut()
		}
	}


	return (
		<Layout.Header>
			<Row justify={'end'}>
				{isAuth
					?
					<>
						<div style={{ color: 'white' }}>{user.username}</div>
						<Menu style={{ minWidth: 100, justifyContent: 'flex-end' }} theme='dark' mode='horizontal' selectable={false} items={itemsPrivate} onClick={clickMenu} />
					</>
					:
					<Menu style={{ minWidth: 100, justifyContent: 'flex-end' }} theme='dark' mode='horizontal' selectable={false} items={itemsPublic} onClick={clickMenu} />
				}

			</Row>
		</Layout.Header>
	)
}

export default Navbar
