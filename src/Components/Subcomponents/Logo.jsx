import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <Link to="/">
            <img src="/icons/navbar-logo.svg" alt="brand-logo" />
        </Link>
    );
}
