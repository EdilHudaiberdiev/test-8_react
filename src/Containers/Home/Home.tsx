import {useEffect, useState} from "react";
import axiosApi from "../../axiosApi";
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';
import QuoteItem from '../../Components/QuoteItem/QuoteItem';

export interface IQuotes {
  id: string;
  author: string;
  text: string;
  category: string
}

const Home = () => {
  const params = useParams();
  const [quotes, setQuotes] = useState<IQuotes[]>([]);
  const [loading, setLoading] = useState(false);
  const Navigation = useNavigate();

  const categories = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Motivational', id: 'motivational'},
    {title: 'Humour', id: 'humour'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Harry Potter', id: 'harry-potter'},
  ];

  const fetchData = async (url: string) => {

    setLoading(true);
    const quotesArray: IQuotes[] = [];
    const response = await axiosApi.get(url);
    const quotes: {[key: string]: IQuotes} = response.data;
    console.log(response);

    if (response.data !== null) {
      for (const [key, value] of Object.entries(quotes)) {
        quotesArray.push({
            id: key,
            author: value.author,
            text: value.text,
            category: value.category
        });
      }
      setQuotes(quotesArray);
    }
      setLoading(false);
  };

  useEffect(() => {
    if (params.category === undefined) {
      fetchData('/quotes.json').catch(e => console.error(e));
    } else {
      fetchData(`/quotes.json?orderBy="category"&equalTo="${params.category}"`).catch(e => console.error(e));

    }
    console.log(params.category);

  }, [params.category]);

  const deleteQuote = async (id: string, category: string) => {
    setLoading(true);
    try {
      await axiosApi.delete(`/quotes/${id}.json`);
      Navigation(`/quotes/${category}`);
    } catch (e) {
      console.error(e);
    }
      setLoading(false);
  };

  return (
    <>
      <div>
        <NavLink className="link-dark" to={`/`}>All</NavLink>
      </div>

      {categories.map(category => (
        <div key={category.id}>
          <NavLink className="link-dark" to={`/quotes/${category.id}`}>{category.title}</NavLink>
        </div>
      ))}

      <div className='w-75'>
        {loading ? <Spinner/> :
          <>
            {quotes.length > 0 ?
                <>
                  {quotes.map(quote => (
                    <QuoteItem quote={quote} key={quote.id} deleteQuote={deleteQuote} />
                  ))}
                </>
              :
              <h4>No quotes yet</h4>
            }
          </>
        }
      </div>

    </>
  );
};


export default Home;