import { gql } from "@apollo/client"
import { PERSON_ALL_DETAILS_FRAGMENT } from "./graphql-queries"


export const CREATE_PERSON = gql`
	mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
		addPerson(
			name: $name, 
			street: $street, 
			city: $city, 
			phone: $phone
		) {
			...PersonDetails
		}
	}

	${PERSON_ALL_DETAILS_FRAGMENT}
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