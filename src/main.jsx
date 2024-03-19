import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'

const getAuth = () => {
	const token = localStorage.getItem('phonenumbers-users-token')
	return token ? `bearer ${token}` : ''
}

const httpLink = new HttpLink({ 
	uri: 'http://localhost:4000',
	headers: {
		authorization: getAuth()
	}
})

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: httpLink
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
	<ApolloProvider client={client}>
    	<App />
	</ApolloProvider>
  </React.StrictMode>,
)
