import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import "./Home.scss";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchTweets = async () => {
      try {
        const { data } = await axios.get("/utils/twitter", { cancelToken: source.token });
        setTweets(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("unsubscribe api call");
        } else {
          throw (error);
        }
      }
    }

    fetchTweets();
    setInterval(fetchTweets, 60000);

    return () => {
      source.cancel();
    }
  }, []);

  const { isLoggedIn } = useContext(UserContext);
  const button = isLoggedIn ? (
    <button
      onClick={() => {
        window.location.replace("/dashboard");
      }}
      className="btn-primary"
    >
      Create New List
    </button>
  ) : (
      <button
        onClick={() => {
          window.location.replace("/auth/google");
        }}
        className="btn-danger"
      >
        <span>Sign up with</span>
        <span className="icon">
          <i className="fab fa-google"></i>
        </span>
      </button>
    );

  const allTweets = tweets && tweets.map((tweet, index) => (
    <div className="tile tweet is-vertical is-3" key={index}>
      <div className="tile">{tweet.text}</div>
      <div className="tile">{moment(tweet.date).calendar()}</div>
    </div>
  ));

  return (
    <section className="hero tinted-image is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="has-text-white is-size-1 title-secondary">ASTRO-TEAM</p>
          <p className="p-b-lg has-text-light is-size-5">We help teams collaborate easlly.</p>

          {button}
        </div>
      </div>
      <div className="hero-footer m-xl">
        <p className="m-b-lg has-text-white">
          <span style={{ fontSize: "1.5em" }}>
            <i className="m-r-sm fab fa-twitter"></i>
          </span>
          Latest Tweets:
        </p>
        <div className="tile is-ancestor">{allTweets}</div>
      </div>
    </section>
  );
};

export default Home;
