import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/Article";

const Demo = () => {
  const [articles, setArticles] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getSummary({ articleUrl: articles.url });
      if (data?.summary) {
        const newArticles = { ...articles, summary: data.summary };
        const updatedAllArticles = [newArticles, ...allArticles];
        setArticles(newArticles);
        setAllArticles(updatedAllArticles);
        console.log(newArticles);

        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  const handleCopy=(copyurl)=>{
    setCopied(copyurl);
    navigator.clipboard.writeText(copyurl);
    setTimeout(()=>setCopied(false),2000);
  }
  const handleDelete = (urlToDelete) => {
    const updatedAllArticles = allArticles.filter(
      (article) => article.url !== urlToDelete
    );
    setAllArticles(updatedAllArticles);
    localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
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
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticles(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={()=>handleCopy(item.url)}>
                <img
                  src={copied===item.url?tick:copy}
                  alt="copy_icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm-truncate">
                {item.url}
              </p>
              <button className="delete_btn text-red-500 ml-4" onClick={()=>handleDelete(item.url)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : (
          articles.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {articles.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;