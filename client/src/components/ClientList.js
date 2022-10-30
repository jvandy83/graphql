import { useQuery } from '@apollo/client';

import { GET_CLIENTS } from '../queries';

export const ClientList = () => {
	const { data, loading, error } = useQuery(GET_CLIENTS);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>{`Error ${error.message}`}</div>;
	return (
		<ul style={{ listStyle: 'none', padding: 0 }}>
			{data?.clients.map((client) => (
				<li key={client._id}>{client.name}</li>
			))}
		</ul>
	);
};
