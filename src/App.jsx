import reactLogo from './assets/react.svg'
import './App.css'
import { Persons } from './Components/Persons'
import { PersonForm } from './Components/PersonForm'
import { Notify } from './Components/Notify'
import { usePersons } from './persons/custom-hooks'
import { useState } from 'react'
import { PhoneForm } from './Components/PhoneForm'

function App() {
	const {data, error, loading} = usePersons()
	const [errorMessage, setErrorMessage] = useState(null)

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
			<PhoneForm notifyError={notifyError} />
			<PersonForm notifyError={notifyError} />
		</>
	)
}

export default App