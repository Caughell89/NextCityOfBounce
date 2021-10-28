import React, { Component } from "react";
import { Avatar, Image, Tooltip } from "antd";
import Footer from "../Footer.js";
import articles from "../../content/articles";
import * as moment from "moment";

import "./article.css";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: { content: [] },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(articles);
    let currentA = articles.filter((article) => {
      return article.title === this.props.match.params.title.replace(/-/g, " ");
    });
    this.setState({ article: currentA[0] });
  }

  render() {
    console.log(this.state.article);
    let backgroundImg = "url(" + this.state.article.img + ")";
    let content = this.state.article.content.map((p) => {
      return <div className="article-p">{p}</div>;
    });
    return (
      <>
        <div className="content">
          <div className="article-content">
            <h1 className="bold mt-4">
              {this.props.match.params.title.replace(/-/g, " ")}
            </h1>
            <div className="mid-gray f-14 mt-2 mb-4">
              {this.props.match.params.type.replace(/-/g, " ")}
            </div>

            <div className="line"></div>
            <div className="mb-4">
              <div
                className="article-backdrop"
                style={{
                  backgroundImage: "url(" + this.state.article.img + ")",
                }}
              ></div>

              <div className="f-14 mid-gray mt-4 ">
                {this.state.article.authorName}
              </div>

              <div className="f-12 mb-4">
                {this.state.article.updatedAt === ""
                  ? moment(this.state.article.createdAt).format("ll")
                  : moment(this.state.article.updatedAt).format("ll")}
              </div>

              <div className="article-text mb-4">{content}</div>
              {this.state.article.updatedAt !== "" && (
                <div className="f-13 mid-gray">
                  Originally posted:{" "}
                  {moment(this.state.article.createdAt).format("ll")}
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Article;
