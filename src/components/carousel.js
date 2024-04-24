import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase-config";
import { useEffect, useState } from "react";
import "../stylesheet/carousel.css";
import { Col, Container, Row } from "react-bootstrap";

const DisplayCarousel = () => {
  const collectionRef = collection(database, "tabData");
  const [getData, setData] = useState({
    id: "",
    img: "",
    name: "",
  });

  const getAPIData = async () => {
    await getDocs(collectionRef).then((response) => {
      const data = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData([...data]);
      console.log(data);
    });
  };

  useEffect(() => {
    getAPIData();
  }, []);

  return (
    <div>
      {getData.length > 0 &&
        getData.map((data) => {
          return (
            <div style={{ display: "flex" }}>
              <div key={data.id} className="carousel-item">
                <Container>
                  <Row>
                    <Col>
                      <span>
                        <h3>{data.name}</h3>
                      </span>
                      <span className="carousal-content">
                        <p>{data.text}</p>
                      </span>
                    </Col>
                  </Row>
                </Container>
              </div>
              <div className="carousel-img">
                <img src={data.img} alt={data.name} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default DisplayCarousel;
