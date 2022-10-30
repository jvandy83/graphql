import { useQuery, useMutation } from '@apollo/client';

import { FETCH_PROJECTS } from '../queries';

import { DELETE_PROJECT } from '../mutations';

export const ProjectList = () => {
	const { data, loading, error } = useQuery(FETCH_PROJECTS);
	const [
		deleteProject,
		{ data: deleteData, loading: deleteLoading, error: deleteError },
	] = useMutation(DELETE_PROJECT, {
		refetchQueries: [{ query: FETCH_PROJECTS }],
	});
	const handleDelete = (id) => {
		deleteProject({ variables: { id } });
	};
	const renderProjects = () => {
		return data.projects.map(({ _id, name }) => {
			console.log(_id);
			return (
				<li key={_id}>
					<p>{name}</p>
					<button onClick={() => handleDelete(_id)}>X</button>
				</li>
			);
		});
	};
	if (loading) return <div>Loading...</div>;
	if (error) return <div>{`Error ${error.message}`}</div>;
	return <ul style={{ listStyle: 'none', padding: 0 }}>{renderProjects()}</ul>;
};
