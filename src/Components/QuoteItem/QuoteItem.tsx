import React from 'react';
import {IQuotes} from '../../Containers/Home/Home';
import {useNavigate} from "react-router-dom";

interface Props {
  quote: IQuotes,
  deleteQuote: (id: string, category: string) => void
}

const QuoteItem: React.FC<Props> = ({quote, deleteQuote}) => {
  const Navigation = useNavigate();

  return (
    <div className="card mb-3 w-50">
      <div className="card-body">
        <h4>{quote.author}</h4>
        <p>{quote.text}</p>
          <button className="btn btn-danger me-3" type="button" onClick={() => deleteQuote(quote.id, quote.category )}>Delete</button>
          <button className="btn btn-danger me-3" type="button" onClick={() => Navigation(`/quotes/${quote.id}/edit`)}>Edit</button>
      </div>
    </div>
  );
};

export default QuoteItem;