import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Modal, Form } from "react-bootstrap";

const EventPopup = () => {
  const [show, setShow] = useState(true);
  const [closeToday, setCloseToday] = useState(false);
  const navigate = useNavigate();

  const goEventPage = () => {
    navigate("/event");
    setShow(false);
  };

  const setCookie = (name, value, expireDays) => {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today.setDate(today.getDate() + expireDays);
    document.cookie =
      name +
      "=" +
      encodeURIComponent(value) +
      "; expires=" +
      today.toUTCString();
  };

  const getCookie = (name) => {
    const cookie = document.cookie;
    if (cookie) {
      let cookieArray = cookie.split("; ");
      let cookieName = cookieArray.find((c) => c.split("=")[0] === name);
      return cookieName && cookieName.split("=")[1];
    }
    return;
  };

  const handleCloseToday = (event) => {
    setCloseToday(event.target.checked);
  };

  const handleClose = () => {
    setShow(false);
    if (closeToday) {
      setCookie("mycookie", "popupEnd", 1);
    }
  };

  useEffect(() => {
    const checkCookie = getCookie("mycookie");
    if (checkCookie === "popupEnd") {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  return (
    <>
      <Modal
        size="sm"
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        backdropClassName="event-backdrop"
        dialogClassName="event-dialog"
        contentClassName="event-content"
      >
        <Modal.Header>오픈 기념 EVENT</Modal.Header>
        <Modal.Body>
          <div className="coupon">
            <img src="/image/coupon.png" alt="coupon-event"></img>
            <Button onClick={goEventPage} className="coupon-btn" variant="dark">
              쿠폰 다운로드
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Form.Check
            type="checkbox"
            id="today"
            label="오늘 하루 보이지 않기"
            onChange={handleCloseToday}
          />
          <Button variant="primary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EventPopup;