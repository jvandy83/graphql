import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { GET_CLIENTS } from '../queries';

const ADD_CLIENT = gql`
	mutation AddClient($name: String!, $email: String!, $phone: String!) {
		addClient(name: $name, email: $email, phone: $phone) {
			_id
			name
		}
	}
`;

export const ClientForm = () => {
	const [values, setValues] = useState({ name: '', email: '', phone: '' });
	const [addClient, { addClientData, loading, error }] = useMutation(
		ADD_CLIENT,
		{
			refetchQueries: [{ query: GET_CLIENTS }],
		},
	);

	const handleChange = ({ target }) => {
		setValues((prev) => ({
			...prev,
			[target.name]: target.value,
		}));
	};

	const handleSubmit = (e) => {
		e && e.preventDefault();
		addClient({
			variables: {
				name: values.name,
				email: values.email,
				phone: values.phone,
			},
		});
	};

	return (
		<div>
			<h2>Client Form</h2>
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
					<label htmlFor='email'>
						Email
						<input
							type='text'
							onChange={handleChange}
							name='email'
							value={values.email}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='phone'>
						Phone
						<input
							type='text'
							onChange={handleChange}
							name='phone'
							value={values.phone}
						/>
					</label>
				</div>
				<div>
					<button>Submit</button>
				</div>
			</form>
		</div>
	);
};
