import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
	useEffect(() => {
		fetch('http://localhost:4000', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({ query: `
				query {
					allPersons {
						name
						phone
						address {
							street
						}
					}
				}
			`})
		})
		.then( res => res.json())
		.then(res => {
			console.log(res.data)
		})
	}, [])

	return (
		<>
		<div>
			<a href="https://react.dev" target="_blank">
			<img src={reactLogo} className="logo react" alt="React logo" />
			</a>
		</div>
		<h1>GraphQL + React</h1>

		</>
	)
}

export default App