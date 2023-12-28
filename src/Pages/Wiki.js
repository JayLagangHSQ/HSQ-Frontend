import { useContext, useState, useEffect } from "react"
import UserContext from '../userContext';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import AddNewForm from "../Components/AddNewForm";
import LoaderTwo from "../Components/Subcomponents/loader/LoaderTwo";
import WikiSearchArea from "../Components/WikiSearchArea";
import NoFormsFound from "../Components/NoFormsFound";
import ArticleCard from "../Components/ArticleCard"


export default function Wiki(){
    const {user} = useContext(UserContext);
    const [articles, setArticles]=useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [header, setHeader] = useState('All Forms & Docs')

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/api/articles/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data)
            setLoading(false);
        })
        
    },[])

    const refreshEffect = () =>{
        setLoading(true); 
        fetch(`${process.env.REACT_APP_API_URL}/api/articles/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setArticles(data)
            console.log(data);
            setLoading(false);
        })
    }
    return( 
        <>
        <div className="row">

            <div className="mb-0 col-5">
                <h4 className="text-muted">Wiki</h4>
            </div>

            <div className="col-6 ml-auto">
                {user.isManager ?
                <Link to="/compose-article">Compose Article</Link>
                :
                <>
                </>
                }
                <WikiSearchArea setArticles={setArticles} setLoading={setLoading} refreshEffect={refreshEffect} setHeader={setHeader}/>
            </div>
        </div>
        <hr />
        <div>
        {loading ? (
                // Render loader if data is still being fetched
                <LoaderTwo />
        ) : (
                // Render forms if data has been fetched
                articles !== null && articles.length > 0 ? (
                    articles.map(article => (
                        <ArticleCard
                            article={article}
                            key={article._id}
                            refreshEffect={refreshEffect}
                            user={user}
                        />
                    ))
                ) : (
                        <NoFormsFound />
                    )
            )}
        </div>
        </>
        
    )
}