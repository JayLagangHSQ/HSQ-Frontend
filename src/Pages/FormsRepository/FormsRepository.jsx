import React, { useContext, useState, useEffect } from "react";
import UserContext from '../../Contexts/userContext';
import FormCard from "./components/FormCard";
import AddNewForm from "./components/AddNewForm";
import LoaderTwo from "../../Components/Subcomponents/loader/LoaderTwo";
import SearchArea from "./components/SearchArea";
import NoFormsFound from "./components/NoFormsFound";

export default function FormsRepository() {
    const { user } = useContext(UserContext);
    const [forms, setForms] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [formsPerPage] = useState(10);
    const [header, setHeader] = useState('All Forms & Docs');

    useEffect(() => {
        fetchForms();
    }, []);

    const fetchForms = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_APP_API_URL}/api/forms/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setForms(data);
            setLoading(false);
        });
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const refreshEffect = () => {
        fetchForms();
    };

    // Logic to get current forms
    const indexOfLastForm = currentPage * formsPerPage;
    const indexOfFirstForm = indexOfLastForm - formsPerPage;
    const currentForms = forms && forms.slice(indexOfFirstForm, indexOfLastForm);

    return (
        <>
        <div className="p-3 mt-3" style={{borderStyle:'solid', borderColor:'#516473', borderRadius:'8px', borderWidth:'1px'}}>

        
            <div className="row">
                <div className="mb-0 col-3">
                    <h4 className="text-muted">Forms Repository</h4>
                </div>
                <div className="col-8 ml-auto">
                    <SearchArea setForms={setForms} setLoading={setLoading} refreshEffect={refreshEffect} setHeader={setHeader} setCurrentPage={setCurrentPage}/>
                </div>
            </div>
            <hr />
            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-4"></div>
                    <div className="col-4 text-center d-flex align-items-center justify-content-center">
                        <h6 className="m-0" style={{ textDecoration: 'underline', color:'#516473' }}>{header}</h6>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        {user.isManager ?
                            <AddNewForm setForms={setForms} refreshEffect={refreshEffect} />
                            :
                            <>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div>
                {loading ? (
                    <LoaderTwo />
                ) : (
                    currentForms !== null && currentForms.length > 0 ? (
                        currentForms.map(form => (
                            <FormCard
                                formId={form._id}
                                key={form._id}
                                name={form.name}
                                department={form.department}
                                description={form.description}
                                link={form.link}
                                refreshEffect={refreshEffect}
                                user={user}
                            />
                        ))
                    ) : (
                        <NoFormsFound />
                    )
                )}
                {/* Pagination controls */}
                <div className="d-flex justify-content-center">
                    {forms && forms.length > formsPerPage && (
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(forms.length / formsPerPage) }).map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}
