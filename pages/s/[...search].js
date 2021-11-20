import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";
import ProductTile from "../../components/ProductTile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/Search.module.css";
import { urlLocToString } from "../../utils/FormTools";
import { productSearch, productSearchFiltered } from "../../utils/API";
import {
  Menu,
  Dropdown,
  Slider,
  InputNumber,
  Checkbox,
  Drawer,
  Tag,
  Switch,
} from "antd";
import { DownOutlined, ControlOutlined } from "@ant-design/icons";

import moment from "moment";

export default function Search() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filteredMax, setFilteredMax] = useState(maxPrice);
  const [filteredMin, setFilteredMin] = useState(0);
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [visible, setVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [filters, setFilters] = useState([]);
  const [tent, setTent] = useState(true);
  const [table, setTable] = useState(true);
  const [bh, setBh] = useState(true);
  const [chair, setChair] = useState(true);
  const [inflatable, setInflatable] = useState(true);
  const [pp, setPp] = useState(true);
  const [instantBook, setInstantBook] = useState(false);

  const onClick = () => {
    setFilters(["Filter1", "Filter2"]);
    setTypeVisible(false);
  };
  const closeFilter = () => {
    setTypeVisible(false);
  };
  const handleVisibleChange = (flag) => {
    setTypeVisible(flag);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const savePrices = () => {
    console.log("saving prices");
  };

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
    // loadProducts();
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
    <Menu className={styles.filterBackdrop} onClick={onClick}>
      <div className={styles.filterMenu}>
        <h4 className="bold mb2">Rental Price</h4>
        <Slider
          range
          marks={marks}
          min={0}
          step={10}
          max={maxPrice}
          defaultValue={[0, maxPrice]}
          disabled={false}
          onChange={(value) => (
            setFilteredMin(value[0]), setFilteredMax(value[1])
          )}
        />
        <div className="flex pt2">
          <InputNumber
            min={0}
            max={maxPrice}
            value={filteredMin}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(e) => setFilteredMin(e)}
          />
          <InputNumber
            min={0}
            max={maxPrice}
            value={filteredMax}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(e) => setFilteredMax(e)}
          />
        </div>
        <div className="flex mt2">
          <div className="cancelButtonSm" onClick={closeFilter}>
            Cancel
          </div>
          <div className="bounceButtonSm" onClick={savePrices}>
            Save
          </div>
        </div>
      </div>
    </Menu>
  );

  const typeMenu = (
    <Menu className={styles.filterBackdrop} onClick={onClick}>
      <div className={styles.filterMenu}>
        <h4 className="bold">Rental Type</h4>
        <div>
          <Checkbox checked={bh} onChange={(e) => setBh(!bh)}>
            Bounce House
          </Checkbox>
        </div>
        <div>
          <Checkbox checked={tent} onChange={(e) => setTent(!tent)}>
            Tent
          </Checkbox>
        </div>
        <div>
          {" "}
          <Checkbox checked={table} onChange={(e) => setTable(!table)}>
            Table
          </Checkbox>
        </div>
        <div>
          {" "}
          <Checkbox checked={chair} onChange={(e) => setChair(!chair)}>
            Chair
          </Checkbox>
        </div>
        <div>
          {" "}
          <Checkbox
            checked={inflatable}
            onChange={(e) => setInflatable(!inflatable)}
          >
            Inflatable
          </Checkbox>
        </div>
        <div>
          {" "}
          <Checkbox checked={pp} onChange={(e) => setPp(!pp)}>
            Party Package
          </Checkbox>
        </div>

        <div className="flex mt2">
          <div className="cancelButtonSm" onClick={closeFilter}>
            Cancel
          </div>
          <div className="bounceButtonSm" onClick={onClick}>
            Save
          </div>
        </div>
      </div>
    </Menu>
  );

  const handleIB = (e) => {
    console.log(e);
    e
      ? filters.push("Instant Book")
      : setFilters(filters.filter((f) => f !== "Instant Book"));
  };
  const instantBookMenu = (
    <Menu className={styles.filterBackdrop} onClick={onClick}>
      <div className={styles.filterMenu}>
        <h4 className="bold">Instant Book</h4>
        <div className="f12 mb1">
          Listings you can book without waiting for company approval
        </div>
        <Switch
          checked={instantBook}
          onChange={() => setInstantBook(!instantBook)}
          onClick={handleIB}
        />
      </div>
    </Menu>
  );

  const productTiles = products.map((product) => {
    return <ProductTile product={product} />;
  });

  const filterTags = filters.map((filter) => {
    return (
      <Tag closable={true} color="#1cacc8" onClose={() => filters.pop(filter)}>
        Test {filter}
      </Tag>
    );
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

      <div className="content">
        <div>
          {products.length} {products.length !== 1 ? "items" : "item"} available{" "}
        </div>
        <h3 className="bold">
          Party Essentials in{" "}
          {router.query.location === undefined
            ? ""
            : urlLocToString(router.query.location)}
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
              onVisibleChange={handleVisibleChange}
              visible={typeVisible}
            >
              <div>
                TYPE
                <DownOutlined />
              </div>
            </Dropdown>
            <Dropdown
              trigger={["click"]}
              className={styles.option}
              overlay={instantBookMenu}
            >
              <div>
                INSTANT BOOK
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
          <div>
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
          <div className={styles.filterOptionsMobile}>
            <div className={styles.optionMobile} onClick={showDrawer}>
              <ControlOutlined
                rotate={90}
                style={{
                  fontSize: "20px",
                  color: "#1cacc8",
                  marginRight: ".6rem",
                }}
              />
              Filter / Sort
            </div>
          </div>
        </div>
        <div className={styles.filterTags}>{filterTags}</div>
        <div className={styles.searchResults}>{productTiles}</div>
        {products.length === 0 && !loading && (
          <div>
            <h3 className="bold">No results</h3>
            <p>Try adjusting your location, date, or removing filters</p>
          </div>
        )}
      </div>

      <Drawer
        title="Filter & Sort"
        placement="bottom"
        onClose={onClose}
        visible={visible}
      >
        <div>Sort By: {sort}</div>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
}
