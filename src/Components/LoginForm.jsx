import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from '../login/graphql-mutations'

export const LoginForm = ({notifyError, setToken}) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			notifyError(error.graphQLErrors[0].message)
		}
	})	

	useEffect( () => {
		if(result.data) {
			const {value: token} = result.data.login
			setToken(token)
			localStorage.setItem('phonenumbers-users-token', token)
		}
	}, [result.data])
	const handleSubmit = (event) => {
		event.preventDefault()

		login( { variables: {username, password}})
		setUsername('')
		setPassword('')
		return null
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					username <input 
					type="text" 
					value={username}
					onChange={ ({target}) => setUsername(target.value)}
					/>
				</div>
				<div>
					password <input 
					type="password" 
					value={password}
					onChange={ ({target}) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)
}