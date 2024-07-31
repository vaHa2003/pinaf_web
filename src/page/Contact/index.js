import classNames from "classnames/bind";
import React, { useContext, useEffect, useRef } from "react";
import { LoaderContext } from "~/context/Loader/LoaderContext";
import styles from "./Contact.module.scss";
import { CircularProgress } from "@mui/material";
import Footer from "~/components/layout/DefaultLayout/Footer";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";
const cx = classNames.bind(styles);

function Contact() {
  const loading = useContext(LoaderContext);

  // send mail
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("pianf", "template_91f286n", form.current, {
        publicKey: "P5qFAOhO02BtHKk_G",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  useEffect(() => {
    AOS.init({
      debounceDelay: 100,
    });
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <div className={cx("loading")}>
          <CircularProgress ize="lg" color="success" />
        </div>
      ) : (
        <div className={cx("contact")}>
          <div className={cx("contact__layout")}>
            <div className={cx("contact__container")}></div>
            <div className={cx("contact__breadcrumb-title")}>
              <h4>Contact Us</h4>
              <span>
                <a href="/">Home </a> - Contact Us
              </span>
            </div>
          </div>
          <div className={cx("contact__intro")}>
            <h4 className={cx("contact__title")} data-aos="zoom-in">
              Contact Us
            </h4>
            <p className={cx("contact__content")} data-aos="zoom-in">
              Our Contact Details
              <br />
              <span>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered <br /> alteration in some form,
                biny injected humour, or randomise
              </span>
            </p>

            {/* address */}
            <div className={cx("addresss")}>
              <div className={cx("addresss__contaner")} data-aos="zoom-in">
                <div className={cx("addresss__item")}>
                  <div className={cx("address__item-type")}>
                    <LocalPhoneIcon
                      style={{ fontSize: "54px", color: "#79a307" }}
                    />
                    <div className={cx("address__item-info")}>
                      <h3 className={cx("address__item-title")}>Phone</h3>
                      <ul>
                        <li>
                          <a href="tel:+008123456789">(+008) 123 456 789</a>
                        </li>
                        <li>
                          <a href="tel:+008123456789">(+008) 123 456 789</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={cx("addresss__item")}>
                  <div className={cx("address__item-type")}>
                    <LocationOnIcon
                      style={{ fontSize: "54px", color: "#79a307" }}
                    />
                    <div className={cx("address__item-info")}>
                      <h3 className={cx("address__item-title")}>Address</h3>
                      <ul>
                        <li>
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=Address+goes+Here"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Address goes Here
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=123,kda-polt"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            123,kda-polt
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className={cx("addresss__item")}>
                  <div className={cx("address__item-type")}>
                    <AttachEmailIcon
                      style={{ fontSize: "54px", color: "#79a307" }}
                    />
                    <div className={cx("address__item-info")}>
                      <h3 className={cx("address__item-title")}>Email</h3>
                      <ul>
                        <li>
                          <a href="mailto:yourdemo@gmail.com">
                            yourdemo@gmail.com
                          </a>
                        </li>
                        <li>
                          <a href="mailto:support25@gmail.com">
                            support25@gmail.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* form messen */}
          <div className={cx("contact__send")}>
            <h4 className={cx("contact__title")} data-aos="zoom-in">
              Send Us A Message
            </h4>
            <p className={cx("contact__content")} data-aos="zoom-in">
              Get In Touch With Us
            </p>

            <div className={cx("form__message")}>
              <form
                action=""
                className={cx("form__control")}
                ref={form}
                onSubmit={sendEmail}
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
              >
                <div>
                  <input
                    type="text"
                    placeholder="First name *"
                    required
                    name="first_name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last name *"
                    required
                    name="last_name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Email *"
                    required
                    name="email"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject*"
                    required
                    name="subject"
                  />
                </div>
                <div className={cx("form__textarea")}>
                  <textarea
                    name="your_message"
                    id=""
                    cols="30"
                    rows="10"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <div>
                  <button type="submit" value="Send">
                    SEND MESSAGE
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* google map */}
          <div className={cx("google__map")} data-aos="zoom-in">
            <iframe
              title="Unique Title"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d57541.68705142237!2d-74.074687687713!3d40.71444134744844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2zVGjDoG5oIHBo4buRIE5ldyBZb3JrLCBUaeG7g3UgYmFuZyBOZXcgWW9yaw!5e0!3m2!1svi!2sus!4v1713034699656!5m2!1svi!2sus"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <Footer />
        </div>
      )}
    </React.Fragment>
  );
}

export default Contact;
