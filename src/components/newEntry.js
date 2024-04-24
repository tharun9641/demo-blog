import { Col, Container, Row } from "react-bootstrap";
import "../stylesheet/newEntry.css";
import { useContext, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FileStorage, database } from "../firebase-config";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { UserContext } from "./context";

const NewEntry = () => {
  const { getUserName } = useContext(UserContext);
  const collectRef = collection(database, "tabData");
  const [getData, setData] = useState({
    title: "",
    description: "",
    img: "",
    likes: 0,
    addedBy: "",
    addedOn: "",
  });
  const [getImg, setImg] = useState(null);

  const Handlechange = (e) => {
    setData({ ...getData, [e.target.name]: e.target.value });
  };

  const HandleImage = (e) => {
    setImg(e.target.files[0]);
  };

  const UploadImg = async (e) => {
    e.preventDefault();
    if (getImg) {
      const imgDetails = ref(FileStorage, `images/${getImg.name + v4()}`);
      await uploadBytes(imgDetails, getImg).then(() => {
        getDownloadURL(imgDetails).then((item) => {
          setData({ ...getData, img: item });
        });
      });
    }
  };

  const AddEntry = async () => {
    setData({ ...getData, addedBy: getUserName, addedOn: new Date.now() });
    UploadImg();
    addDoc(collectRef, getData);
  };

  return (
    <div id="new">
      <h1>New entry</h1>
      <Container className="add-entry">
        <div className="entry-container">
          <Row>
            <Col>Title :</Col>
            <Col>
              <input type="text" name="title" onChange={Handlechange}></input>
            </Col>
          </Row>
          <Row>
            <br />
            <Col>Description :</Col>
            <Col>
              <textarea
                rows={5}
                cols={50}
                name="description"
                onChange={Handlechange}></textarea>
            </Col>
          </Row>
          <Row>
            <Row>
              <br />
              <Col>Add Image :</Col>
              <Col>
                <input type="file" name="image" onChange={HandleImage}></input>
              </Col>
            </Row>
            <Row></Row>
            <br />
            <button onClick={AddEntry}>Add</button>
          </Row>
        </div>
      </Container>
    </div>
  );
};
export default NewEntry;
