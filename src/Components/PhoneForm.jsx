import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { EDIT_NUMBER } from "../persons/graphql-mutations"

export const PhoneForm = ({notifyError}) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	const [changeNumber, result] = useMutation(EDIT_NUMBER)

	useEffect(() => {
		if(result.data && result.data.editNumber === null) {
			notifyError('Person not found')
		}
	}, [result.data])

	const handleSubmit = e => {
		e.preventDefault()

		changeNumber({ variables: { name, phone}})
		setName('')
		setPhone('')
	}

	return (
		<div>
			<h2>Edit Phone Number</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<input placeholder='Name' value={name} onChange={(ev) => setName(ev.target.value)} />
				</div>
				<div>
					<input placeholder='Phone' value={phone} onChange={(ev) => setPhone(ev.target.value)} />
				</div>
				<button>Change Phone</button>
			</form>
		</div>
	)
}