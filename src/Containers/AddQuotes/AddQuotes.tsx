import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import axiosApi from "../../axiosApi";

const AddQuotes = () => {
  const Navigation = useNavigate();
  const categories = [
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Motivational', id: 'motivational'},
    {title: 'Humour', id: 'humour'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Harry Potter', id: 'harry-potter'},
  ];
  const [quote, setQuote] = useState<IQuoteSendForm>({
    text: '',
    author: '',
    category: '',
  });


  const changeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setQuote((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosApi.post('quotes.json', quote);
    } finally {
      Navigation('/');
    }
  };

  return (
    <>
      <form onSubmit={onFormSubmit}>
        <h2 className="text-center mb-4">Add new quote</h2>
        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="author"
            name="author"
            id="author"
            className="form-control"
            value={quote.author}
            onChange={changeForm}
          />
        </div>

        <select name="category" onChange={changeForm}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </select>

        <div className="mb-3 w-75 mx-auto">
          <label htmlFor="text" className="form-label">Quote</label>
          <textarea
            name="text"
            id="text"
            className="form-control"
            value={quote.text}
            onChange={changeForm}
          ></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </form>
    </>
  );
};

export default AddQuotes;