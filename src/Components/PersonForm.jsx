import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_PERSONS } from "../persons/graphql-queries"
import { CREATE_PERSON } from "../persons/graphql-mutations"

export const PersonForm = ({ notifyError }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')

	const [createPerson] = useMutation(CREATE_PERSON, {
		onError: (error) => {
			notifyError(error.graphQLErrors[0].message)
		},
		update: (store, response) => {
			const dataInStore = store.readQuery({ query: ALL_PERSONS})
			store.writeQuery({
				query: ALL_PERSONS,
				data: {
					...dataInStore,
					allPersons: [
						...dataInStore.allPersons,
						response.data.addPerson
					]
				}
			})
		}
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