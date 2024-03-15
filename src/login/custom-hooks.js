import { useQuery, useApolloClient } from "@apollo/client"


export const useUsers = ({setToken}) => {
	const client = useApolloClient()

	const login = () => {
		return null
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	return result
}