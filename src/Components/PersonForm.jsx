import { gql, useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_PERSONS } from "../App"

const CREATE_PERSON = gql`
	mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
		addPerson(
			name: $name, 
			street: $street, 
			city: $city, 
			phone: $phone
		) {
			name
			phone
			address {
				city
				street
			}
		}
	}
`

export const PersonForm = () => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')

	const [createPerson] = useMutation(CREATE_PERSON, {
		refetchQueries: [ { query: ALL_PERSONS}]
	})

	const handleSubmit = e => {
		e.preventDefault()

		createPerson({ variables: { name, phone, street, city}})
		setName('')
		setPhone('')
		setStreet('')
		setCity('')
	}

	return (
		<div>
			<h2>Create new person</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input placeholder='Name' value={name} onChange={(ev) => setName(ev.target.value)} />
				</div>
				<div>
					<input placeholder='Phone' value={phone} onChange={(ev) => setPhone(ev.target.value)} />
				</div>
				<div>
					<input placeholder='City' value={city} onChange={(ev) => setCity(ev.target.value)} />
				</div>
				<div>
					<input placeholder='Street' value={street} onChange={(ev) => setStreet(ev.target.value)} />
				</div>
				<button>Create</button>
			</form>
		</div>
	)
}