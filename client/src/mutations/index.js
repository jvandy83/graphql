import { gql } from '@apollo/client';

export const DELETE_PROJECT = gql`
	mutation DeleteProject($id: ID!) {
		deleteProject(id: $id) {
			name
		}
	}
`;
