import { gql } from "@apollo/client"

export const CREATE_PERSON = gql`
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

export const EDIT_NUMBER = gql`
	mutation editNumber($name: String!, $phone: String!) {
		editNumber(
			name: $name, 
			phone: $phone
		) {
			name
			id
			phone
		}
	}
`