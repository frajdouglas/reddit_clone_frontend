import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getArticles } from "../utils/api";



const ArticlesList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [articles, setArticles] = useState([])
    const [isError, setIsError] = useState(false)
    const { topic } = useParams();

    const [orderByQuery, setOrderByQuery] = useState('');

    useEffect(() => {
        setIsError(false)
        setIsLoading(true)
        getArticles(topic, orderByQuery).then((dataFromApi) => {
            setArticles(dataFromApi)
            setIsLoading(false)
            if (dataFromApi.length === 0) {
                setIsError(true)
            }
        })
            .catch((err) => { setIsError(err) })
    }, [topic, orderByQuery])

    if (isLoading) return <p>Loading...</p>
    if (isError === true) return <p>No articles exist for this topic</p>
    else if (isError) return { isError }
    else {
        return <section className="mainDisplay">
            <select
                id="sortByDropdown"
                className="sort-by"
                defaultValue={orderByQuery}
                onChange={(e) => {
                    setOrderByQuery(e.target.value);
                }}
            >
                <option key="sort_by" value="">
                    Sort by attribute
                </option>
                <option key="created_at" value="created_at">created_at</option>
                <option key="votes" value="votes">votes</option>
            </select>

            <section className="ArticlesList">
                {articles.map((item) => {
                    return <ul key={item.article_id} className="ArticleItem">
                        <li className="ArticleTitle">{item.title}</li>
                        <br />
                        <li>Topic: {item.topic}</li>
                        <br />
                        <li>Author: {item.author}</li>
                        <br />
                        <li>Created at: {item.created_at}</li>
                        <br />
                        <li>Votes: {item.votes}</li>
                        <Link to={`/article/${item.article_id}`} key="single-article-link">
                            <button>GO TO ARTICLE</button>
                        </Link>
                    </ul>
                })}
            </section>
        </section>
    }
}

export default ArticlesList;

