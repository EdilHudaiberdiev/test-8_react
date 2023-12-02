import {useEffect, useState} from "react";
import axiosApi from "../../axiosApi";
import {NavLink, useParams} from "react-router-dom";

export interface IQuotes {
  id: string;
  author: string;
  text: string;
}

const Home = () => {
  const params = useParams();
  const [quotes, setQuotes] = useState<IQuotes[]>([]);
  const categories = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Motivational', id: 'motivational'},
    {title: 'Humour', id: 'humour'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Harry Potter', id: 'harry-potter'},
  ];

  const fetchData = async (url: string) => {

    const quotesArray = [];
    const response = await axiosApi.get(url);
    const quotes: {[key: string]: IQuotes} = response.data;
    console.log(response)

    if (response.data !== null) {
      for (const [key, value] of Object.entries(quotes)) {
        quotesArray.push({
          id: key,
          author: value.author,
          text: value.text,
        });
      }
      setQuotes(quotesArray);
    }

  };

  useEffect(() => {

    if (params.category === undefined) {
      fetchData('/quotes.json').catch(e => console.error(e));
    } else {
      fetchData(`/quotes.json?orderBy="category"&equalTo="${params.category}"`).catch(e => console.error(e));
    }

  }, [params.category]);


  return (
    <>
      <div>
        <NavLink to={`/quotes/`}>All</NavLink>
      </div>
      {categories.map(category => (
        <div key={category.id}>
          <NavLink to={`/quotes/${category.id}`}>{category.title}</NavLink>
        </div>
      ))}
    </>
  );
};


export default Home;