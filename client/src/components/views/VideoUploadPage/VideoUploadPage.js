import React, { useState } from "react";
import styled from "styled-components";
import { Typography, Button, Form, message, Input } from "antd";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

const Wrapper = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  bottom: 0;
  right: 0;
  max-width: 700px;
  margin: 2rem auto;

  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const PrivateOptions = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" }
];

const categoryOptions = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" }
];

const VideoUploadPage = ({ history }) => {
  const [form, setForm] = useState({
    videoTitle: "",
    description: ""
  });
  const { videoTitle, description } = form;
  const [Private, setPrivate] = useState(0); // public: 1, private: 0
  const [category, setCategory] = useState("Film & Animation");
  const [filePath, setFilePath] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState("");
  const { auth } = useSelector(state => ({
    auth: state.auth.auth
  }));

  // input 상태 입력
  const onChange = e => {
    const { name, value } = e.currentTarget;
    setForm({
      ...form,
      [name]: value
    });
  };

  const onPrivateChange = e => {
    setPrivate(e.currentTarget.value);
  };

  const onCategoryChange = e => {
    setCategory(e.currentTarget.value);
  };

  // video
  const onDrop = files => {
    let formData = new FormData();
    const config = {
      //  content-type: 하나의 타입만 명시 할 수 있다.
      // multipart/form-data: input, 동영상(이미지) 두 종류의 데이터를 함께 보내기 위한 설정
      header: { "content-type": "multipart/form-data" }
    };
    formData.append("file", files[0]);
    // video/upload api 호출
    axios
      .post("/api/video/upload", formData, config)
      .then(response => {
        // 전송 성공
        if (response.data.success) {
          // console.log(response.data);
          let variable = {
            url: response.data.url,
            filename: response.data.filename
          };
          // 상태 저장
          setFilePath(response.data.url);

          // thumbnail 생성 api
          axios.post("/api/video/thumbnail", variable).then(response => {
            if (response.data.success) {
              // console.log(response.data);
              // 상태 저장 => 서버에서 보내준 값

              setDuration(response.data.fileDuration);
              setThumbnailPath(response.data.thumbnailPath);
            } else {
              alert("thumbnail error");
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
        alert(err);
      });
  };

  const onSubmit = e => {
    e.preventDefault();

    let variable = {
      writer: auth._id, // 로그인 유저의 id
      title: videoTitle,
      description: description,
      privacy: Private,
      filePath: filePath,
      duration: duration,
      category: category,
      thumbnail: thumbnailPath
    };
    // db에 video 정보 저장
    axios.post("/api/video/uploadVideo", variable).then(response => {
      if (response.data.success) {
        message.success('success upload!!');
        setTimeout(() => {
          // 2초 뒤 홈을 이동
          history.push('/'); 
        }, (2000));
      } else {
        alert("failed upload Video");
      }
    });
  };

  return (
    <Wrapper>
      <div className="title">
        <Title>Upload Page</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* Dropzone */}
          {/* mutiple: false: 파일 한 개, true: 여러 개 */}
          <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ fontSize: "3rem" }} />
              </div>
            )}
          </Dropzone>

          {/* thumbnailPath가 있을 경우 thumbnail 보여주기 */}
          {thumbnailPath &&
            (
              <div>
                <img
                  src={`http://localhost:5000/${thumbnailPath}`}
                  alt="thumbnail"
                />
              </div>
            )}
        </div>

        <br />
        <br />
        <label>Title</label>
        <Input name="videoTitle" onChange={onChange} value={form.videoTitle} />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          name="description"
          onChange={onChange}
          value={form.description}
        />
        <br />
        <br />
        <select onChange={onPrivateChange}>
          {PrivateOptions.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={onCategoryChange}>
          {categoryOptions.map((item, i) => (
            <option key={i} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </Wrapper>
  );
};

export default withRouter(VideoUploadPage);
