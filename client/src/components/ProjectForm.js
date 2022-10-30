import { useState } from 'react';

import { gql, useMutation, useQuery } from '@apollo/client';

import { GET_CLIENTS, FETCH_PROJECTS } from '../queries';

const ADD_PROJECT = gql`
	mutation AddProject(
		$name: String!
		$description: String!
		$status: ProjectStatus!
		$clientId: ID!
	) {
		addProject(
			name: $name
			description: $description
			status: $status
			clientId: $clientId
		) {
			_id
			name
		}
	}
`;

export const ProjectForm = () => {
	const initialState = {
		name: '',
		description: '',
		status: '',
		member: {
			id: '',
			name: '',
		},
	};
	const [values, setValues] = useState(initialState);
	const [member, setMember] = useState();
	const [addProject, { data, loading, error }] = useMutation(ADD_PROJECT, {
		refetchQueries: [{ query: FETCH_PROJECTS }],
	});
	const {
		data: clientData,
		loading: clientLoading,
		error: clientError,
	} = useQuery(GET_CLIENTS);
	const handleSubmit = (e) => {
		e.preventDefault();
		addProject({
			variables: {
				name: values.name,
				description: values.description,
				status: values.status,
				clientId: member._id,
			},
		});
	};
	const handleChange = ({ target }) => {
		setValues((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};
	const handleMemberSelect = (e) => {
		const { clients } = clientData;
		for (let client of clients) {
			if (client.name === e.target.value) {
				setMember(client);
			}
		}
	};
	console.log('member: ', member);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>{`Error ${error.message}`}</div>;
	return (
		<div>
			<h2>Project Form</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name'>
						Name
						<input
							type='text'
							onChange={handleChange}
							name='name'
							value={values.name}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='description'>
						Description
						<input
							type='text'
							onChange={handleChange}
							name='description'
							value={values.description}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='status'>
						Status
						<input
							type='text'
							onChange={handleChange}
							name='status'
							value={values.status}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='member'>
						Member
						<select
							onChange={handleMemberSelect}
							name='member'
							value={values.member}
						>
							{clientData?.clients.map((client) => (
								<option key={client._id} value={client.name}>
									{client.name}
								</option>
							))}
						</select>
					</label>
					<input type='hidden' value={values.member.id || ''} />
				</div>
				<div>
					<button>Submit</button>
				</div>
			</form>
		</div>
	);
};
