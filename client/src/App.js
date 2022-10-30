import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { ClientForm } from './components/ClientForm';
import { ClientList } from './components/ClientList';
import { ProjectForm } from './components/ProjectForm';
import { ProjectList } from './components/ProjectList';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div>
				<div
					style={{ border: '2px solid black', margin: '4rem', padding: '2rem' }}
				>
					<ClientForm />
					<ClientList />
				</div>
				<div
					style={{ border: '2px solid red', margin: '4rem', padding: '2rem' }}
				>
					<ProjectForm />
					<ProjectList />
				</div>
			</div>
		</ApolloProvider>
	);
}

export default App;
