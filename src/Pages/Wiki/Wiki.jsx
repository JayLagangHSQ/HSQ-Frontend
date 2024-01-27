import { useContext, useState, useEffect } from "react";
import UserContext from '../../Contexts/userContext';
import { Link } from 'react-router-dom';
import LoaderTwo from "../../Components/Subcomponents/loader/LoaderTwo";
import WikiSearchArea from "./components/WikiSearchArea";
import ArticleCard from "./components/ArticleCard";
import NoArticlesFound from "./components/NoArticlesFound";
import Swal from "sweetalert2";

export default function Wiki() {
    const { user } = useContext(UserContext);
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(10);
    const [header, setHeader] = useState('All Forms & Docs');

    

    const fetchArticles = () => {
        setLoading(true);
        try{
            fetch(`${import.meta.env.VITE_APP_API_URL}/api/articles/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            });
        } catch(err){
            Swal.fire({
                title: 'Something went wrong. :(',
                text: 'Please refresh your browser',
            });
        }
        
    };
    useEffect(() => {
        fetchArticles();
    }, []);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const refreshEffect = () => {
        fetchArticles();
    };

    // Logic to get current articles
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles && articles.slice(indexOfFirstArticle, indexOfLastArticle);

    return (
        <>
        <div className="p-3 mt-3" style={{borderStyle:'solid', borderColor:'#516473', borderRadius:'8px', borderWidth:'1px', minHeight:'100vh'}}>
            <div className="row">
                <div className="mb-0 col-3">
                    <h4 className="text-muted">Wiki</h4>
                </div>

                <div className="col-9 ml-auto">
                    <WikiSearchArea setCurrentPage={setCurrentPage} setArticles={setArticles} setLoading={setLoading} refreshEffect={refreshEffect} setHeader={setHeader}/>
                </div>
            </div>
            <hr />
            <div>
                {user.isManager &&
                    <div className="d-flex justify-content-end mb-4">
                        <Link to="/compose-article"><span className="anchor-underline">Create New Article</span></Link>
                    </div>
                }
                {loading ? (
                    <LoaderTwo />
                ) : (
                    currentArticles !== null && currentArticles.length > 0 ? (
                        currentArticles.map(article => (
                            <ArticleCard
                                article={article}
                                key={article._id}
                                refreshEffect={refreshEffect}
                                user={user}
                            />
                        ))
                    ) : (
                        <NoArticlesFound />
                    )
                )}
                {/* Pagination controls */}
                <div className="d-flex justify-content-center">
                    {articles && articles.length > articlesPerPage && (
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(articles.length / articlesPerPage) }).map((_, index) => (
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
