import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { gql, useQuery } from '@apollo/client'
import {Persons} from './Components/Persons'


const ALL_PERSONS = gql`
	query {
		allPersons {
			id
			name
			phone
			address {
				street
				city
			}
		}
	}
`

function App() {
	const {data, error, loading} = useQuery(ALL_PERSONS)
	console.log(data)

	if(error) return <span style='color: red'>{error}</span>
	return (
		<>
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
			
		</>
	)
}

export default App