import React, { Component } from "react";
import { Avatar, Image, Tooltip } from "antd";
import articles from "../pages/api/articles";
import * as moment from "moment";
import styles from "../styles/Article.module.css";
import { useRouter } from "next/router";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: { content: [] },
    };
  }

  render() {
    let backgroundImg = "url(" + this.state.article.img + ")";
    let content = this.state.article.content.map((p) => {
      return <div className="article-p">{p}</div>;
    });
    return (
      <>
        <div className="content">
          <div className="article-content">
            <h1 className="bold mt-4">
              {/* {this.props.match.params.title.replace(/-/g, " ")} */}
            </h1>
            <div className="mid-gray f-14 mt-2 mb-4">
              {/* {this.props.match.params.type.replace(/-/g, " ")} */}
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
      </>
    );
  }
}

export default Article;
