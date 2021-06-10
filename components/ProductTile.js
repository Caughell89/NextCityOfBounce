import React from "react";
import NumberFormat from "react-number-format";
import Link from "next/link";
import styles from "../styles/ProductTile.module.css";
import { motion } from "framer-motion";

const ProductTile = ({ product }) => {
  let linkPath = "/product/" + product.productId;
  let averageReview = 0;
  product.productReviews.map((review) => {
    averageReview += review.stars;
    return null;
  });
  averageReview = averageReview / product.productReviews.length;
  return (
    <div key={product.id} className={styles.pTile}>
      <Link href={linkPath}>
        <motion.a
          key={product.id}
          className="card"
          whileTap={{ scale: 0.8 }}
          whileHover={{
            position: "relative",
            zIndex: 1,
            background: "white",
            scale: 1.05,
            transition: {
              duration: 0.1,
            },
          }}
        >
          <a>
            <div>
              <img src={product.productPhotos[0]} />
              <div className={styles.pD}>
                <div className={styles.pName}>{product.productName}</div>
              </div>
            </div>
            <div className={styles.pInfo}>
              {product.productType !== "Chair" && (
                <>
                  <div className={styles.pFeatureRow}>
                    {/* <TeamOutlined /> <div>{product.capacity} max capacity</div> */}
                  </div>
                  <div className={styles.pFeatureRow}>
                    {/* <FullscreenOutlined /> */}
                    <div>
                      {product.length}' L. x {product.width}' W. x {product.height}' H.
                      
                    </div>
                    </div>
                    <div className={styles.pFeatureRow}>
                     {/* {product.instantBook?<CheckCircleTwoTone twoToneColor="#52c41a"/>:<CloseCircleTwoTone twoToneColor="#eb2f96"/>} */}
          
                    <div>
                      Instant Book  
                    </div>
                  </div>
                </>
              )}
              <div className={styles.pInfoRow}>
                {/* {product.productReviews.length > 0 && (
              <div className={styles.f13}>
                <Stars avg={1} />{" "}
                <span className={styles.bold}>
                  {Math.round(averageReview * 100) / 100}
                </span>
                ({product.productReviews.length} Reviews)
              </div>
            )}
            {product.productReviews.length === 0 && (
              <div className={styles.f13}>
                <Stars avg={1} /> New
              </div>
            )} */}

                <div className={styles.pPrice}>
                  <span className={styles.bold}>
                    <NumberFormat
                      allowLeadingZeros={false}
                      thousandSeparator={true}
                      prefix={"$"}
                      displayType={"text"}
                      value={product.price}
                      decimalScale={2}
                      fixedDecimalScale={true}
                    />
                  </span>{" "}
                  / day
                </div>
              </div>
            </div>
          </a>
        </motion.a>
      </Link>
    </div>
  );
};
export default ProductTile;
