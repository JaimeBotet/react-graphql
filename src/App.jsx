import reactLogo from './assets/react.svg'
import './App.css'
import { Persons } from './Components/Persons'
import { PersonForm } from './Components/PersonForm'
import { Notify } from './Components/Notify'
import { usePersons } from './persons/custom-hooks'
import { useState } from 'react'
import { PhoneForm } from './Components/PhoneForm'
import { LoginForm } from './Components/LoginForm'
import { Logout } from './Components/Logout'
import { ALL_PERSONS } from './persons/graphql-queries'

function App() {
	const {data, error, loading} = usePersons()
	const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(() => localStorage.getItem('phonenumbers-users-token'))

	if(error) return <span style='color: red'>{error}</span>

	const notifyError = message => {
		setErrorMessage(message)
		setTimeout(()=> setErrorMessage(null), 5000)
	}

	return (
		<>
			<Notify errorMessage={errorMessage} />
			<div>
				<a href="https://react.dev" target="_blank">
				<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			{
				loading 
				? <p>Loading...</p>
				: <Persons persons={data?.allPersons} />

			}
			<br />
			{ 
				token
				? <Logout setToken={setToken} />
				: <LoginForm notifyError={notifyError} setToken={setToken} />
			}
			<PhoneForm notifyError={notifyError} />
			<PersonForm notifyError={notifyError} />
		</>
	)
}

export default App