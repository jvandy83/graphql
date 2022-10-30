import { gql } from '@apollo/client';

export const GET_CLIENTS = gql`
	query GetClients {
		clients {
			_id
			name
			email
			phone
		}
	}
`;

export const FETCH_PROJECTS = gql`
	query FetchProjects {
		projects {
			_id
			name
		}
	}
`;
