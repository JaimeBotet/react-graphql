import { useApolloClient } from "@apollo/client"

export const Logout = ({setToken}) => {
	const client = useApolloClient()

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	return (
		<div>
			<button onClick={() => logout()}>Logout</button>
		</div>
	)
}