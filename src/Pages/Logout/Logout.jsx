import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../../Contexts/userContext';

export default function Logout() {

	const {setUser, unsetUser} = useContext(UserContext);

    unsetUser();

	useEffect(() => {
        
		setUser({
			id: null,
            firstName: null,
            lastName: null,
            jobTitle: null,
            isManager: null
		});
        
	})

	return (
		<Navigate to="/" />
	)
}