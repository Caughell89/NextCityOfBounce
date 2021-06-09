import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import styles from '../styles/Footer.less'


class Footer extends React.Component {
  render() {
    const year = new Date();
    return (
      <div className={styles.footerBackground}>
        <div className="">
          <div className={styles.socialIcons}>
            <div className={styles.socialIcon}>
              <a
                href="https://www.facebook.com/cityofbounce/"
                alt="facebook-profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
            </div>
            <div className={styles.socialIcon}>
              <a
                href="https://twitter.com/CityOfBounce"
                alt="twitter-profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
            </div>
            <div className={styles.socialIcon}>
              <a
                href="https://www.instagram.com/cityofbounce/"
                alt="instagram-profile"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
              </a>
            </div>
          </div>
          <div className={styles.copyRight}>
            © {year.getFullYear()} City of Bounce, Inc. All rights reserved
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
