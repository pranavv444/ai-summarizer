import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/Article";
const Demo = () => {
  const [articles, setArticles] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage=JSON.parse(localStorage.getItem('articles'));
    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage);
    }

  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: articles.url });
    if (data?.summary) {
      const newArticles = { ...articles, summary: data.summary };
      const updatedAllArticles=[newArticles,...allArticles];
      setArticles(newArticles);
      setAllArticles(updatedAllArticles);
      console.log(newArticles);

      localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
    }
  };
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder="Enter a URL"
            value={articles.url}
            onChange={(e) => setArticles({ ...articles, url: e.target.value })}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-500 peer-focus:text-gray-700"
          >
            Enter
          </button>
        </form>
        {/* browse url history*/} 
      </div>
    </section>
  );
};

export default Demo;
