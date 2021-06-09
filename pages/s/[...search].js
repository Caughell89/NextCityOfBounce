import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import { Menu, Dropdown, InputNumber, Slider, Checkbox } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ProductTile from "../../components/ProductTile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import globals from "../../styles/globals.css";
import styles from "../../styles/Search.module.css";
import { urlLocToString } from "../../util/FormTools";
import { productSearch, productSearchFiltered } from "../../util/API";

import moment from "moment";

export default function Search() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const loadProducts = () => {
    setLoading(true);
    if (router.query.location === undefined) {
      console.log("waiting for route");
    } else {
  
    productSearch(router.query.location)
      .then((response) => {
        setProducts(response.products);
        setMaxPrice(response.maxPrice);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  };

  let step = maxPrice / 4;
  let marks = {
    0: "$0",
    [step]: "$" + [step],
    [step * 2]: "$" + [step * 2],
    [step * 3]: "$" + [step * 3],
    [maxPrice]: "$" + [maxPrice],
  };

  useEffect(() => {
    console.log("use effect causing pull of new data");
    loadProducts();
  }, [router.query]);

  const sortMenu = (
    <Menu>
      <Menu.Item key="Newest" onClick={(e) => setSort(e.key.toUpperCase())}>
        Newest
      </Menu.Item>
      <Menu.Item
        key="Price: High to Low"
        onClick={(e) => setSort(e.key.toUpperCase())}
      >
        Price: High to Low
      </Menu.Item>
      <Menu.Item
        key="Price: Low to High"
        onClick={(e) => setSort(e.key.toUpperCase())}
      >
        Price: Low to High
      </Menu.Item>
      <Menu.Item
        key="Avg. Customer Review"
        onClick={(e) => setSort(e.key.toUpperCase())}
      >
        Avg. Customer Review
      </Menu.Item>
      <Menu.Item
        key="Top Sellers"
        onClick={(e) => setSort(e.key.toUpperCase())}
      >
        Top Sellers
      </Menu.Item>
    </Menu>
  );

  const priceMenu = (
    <div className={styles.filterMenu}>
      <Slider
        range
        marks={marks}
        min={0}
        step={10}
        max={maxPrice}
        defaultValue={[0, maxPrice]}
        disabled={false}
        onChange={(value) =>
          this.setState({
            filteredMin: value[0],
            filteredMax: value[1],
          })
        }
      />

      <InputNumber
        min={1}
        max={20}
        value={priceRange[0]}
        onChange={(e) => console.log(e)}
      />
    </div>
  );

  const typeMenu = (
    <div className={styles.filterMenu}>
      <div>
        <Checkbox onChange={(e) => console.log(e.checked)}>
          Bounce House
        </Checkbox>
      </div>
      <div>
        <Checkbox onChange={(e) => console.log(e.checked)}>Tent</Checkbox>
      </div>
      <div>
        {" "}
        <Checkbox onChange={(e) => console.log(e.checked)}>Table</Checkbox>
      </div>
      <div>
        {" "}
        <Checkbox onChange={(e) => console.log(e.checked)}>Chair</Checkbox>
      </div>
      <div>
        {" "}
        <Checkbox onChange={(e) => console.log(e.checked)}>Inflatable</Checkbox>
      </div>
      <div>
        {" "}
        <Checkbox onChange={(e) => console.log(e.checked)}>
          Party Package
        </Checkbox>
      </div>
    </div>
  );

  const productTiles = products.map((product) => {
    return <ProductTile product={product} />;
  });

  return (
    <div>
      <Head>
        <title>Search Rentals - City of Bounce</title>
        <meta
          property="og:title"
          content={"Party Rentals | Bounce Houses | Tents - City of Bounce"}
        />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={globals.content}>
        <div>
          {products.length} {products.length !== 1 ? "items" : "item"} available{" "}
        </div>
        <h3 className={globals.bold}>
      
          Party Essentials in {router.query.location === undefined?"":urlLocToString(router.query.location)}
        </h3>
        <div className={styles.searchMenu}>
          <div className={styles.filterOptions}>
            <Dropdown
              trigger={["click"]}
              className={styles.option}
              overlay={priceMenu}
            >
              <div>
                PRICE
                <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown
              trigger={["click"]}
              className={styles.option}
              overlay={typeMenu}
            >
              <div>
                TYPE
                <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown
              trigger={["click"]}
              className={styles.option}
              overlay={"dfakjdoiajadoai"}
            >
              <div>
                INSTANT BOOK
                <DownOutlined />
              </div>
            </Dropdown>
            <div className={styles.option}>
              INSTANT BOOK <DownOutlined />
            </div>
          </div>
          <Dropdown
            trigger={["click"]}
            className={styles.option}
            overlay={sortMenu}
          >
            <div>
              {sort === "" ? "SORT" : sort}
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
        <div className={styles.searchResults}>{productTiles}</div>
        {products.length === 0 && !loading && (
          <div>
            <h3 className="bold">No results</h3>
            <p>Try adjusting your location, date, or removing filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
