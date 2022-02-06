import React, { useState } from 'react';
import { Upload, Modal, Image, Row } from 'antd';
import { prominent } from 'color.js';
import { PlusOutlined } from '@ant-design/icons';
import { rgbToHex } from '../../helpers/helpers';

const UploadPicture = ({ dispatch }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [colors, setColors] = useState([]);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleChange = async ({ fileList }) => {
    if (fileList?.length > 0) {
      const file = fileList[0];
      const preview = await getBase64(file.originFileObj);
      const colors = await prominent(preview, { amount: 20 });
      setFileList(fileList);
      setColors(colors);
      dispatch({ type: 'SET_DATA', data: colors });
    } else {
      setFileList([]);
      setColors([]);
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={dummyRequest}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Image alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>

      {colors?.length > 0 &&
        colors.map((color, index) => {
          return (
            <Row key={index}>
              <div
                key={index}
                style={{
                  background: rgbToHex(color),
                  width: '100%',
                  height: '50px',
                }}
              ></div>
              <p>{rgbToHex(color)}</p>
            </Row>
          );
        })}
    </>
  );
};

export default UploadPicture;
