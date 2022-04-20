import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormInput,
  CButton,
  CToast,
  CToastBody,
  CToastHeader,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { StorePosts } from "../store/action/PostsAction";

const styleToast = {
  position: "absolute",
  zIndex: 1,
  right: 25,
};

const AddNewPosts = () => {
  const initialState = {
    title: "",
    content: "",
    category: "",
    status: "",
  };
  const initialValidationMessage = {
    type: null,
    message: "",
  };
  const [state, setState] = useState(initialState);
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );

  const SetTitle = (e) => setState({ ...state, title: e });
  const SetContent = (e) => setState({ ...state, content: e });
  const SetCategory = (e) => setState({ ...state, category: e });
  const SetStatus = (e) => setState({ ...state, status: e });

  useEffect(() => {
    if (state.status !== "") {
      StorePosts(state).then((res) => {
        const data = res.data;
        if (data.status !== "success") {
          const error = data.data.errors;
          for (const err in error) {
            error[err].map((item) => {
              setValidationMessage({
                type: "Validation Exception!",
                message: item,
              });
            });
          }
        } else {
          setState(initialState);
          setValidationMessage({
            type: "Success",
            message: data.message,
          });
        }
      });
    }
  }, [state.status]);

  return (
    <CRow>
      <CCol xs={12}>
        <div className="toast-comp" style={styleToast}>
          <CToast
            title="CoreUI for React.js"
            autohide={false}
            visible={validationMessage.type ? true : false}
            onClose={() => setValidationMessage(initialValidationMessage)}
          >
            <CToastHeader closeButton>
              <strong className="me-auto">{validationMessage.type}</strong>
            </CToastHeader>
            <CToastBody>{validationMessage.message}</CToastBody>
          </CToast>
        </div>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Posts</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={(e) => SetTitle(e.target.value)}
                  value={state.title}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="content">Content</CFormLabel>
                <CFormTextarea
                  id="content"
                  rows="3"
                  onChange={(e) => SetContent(e.target.value)}
                  value={state.content}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="category">Category</CFormLabel>
                <CFormInput
                  type="text"
                  id="category"
                  placeholder="Category"
                  onChange={(e) => SetCategory(e.target.value)}
                  value={state.category}
                />
              </div>
            </CForm>
            <CRow>
              <CCol xs={12}>
                <div className="d-flex justify-content-end">
                  <CButton color="primary" onClick={() => SetStatus("publish")}>
                    Publish
                  </CButton>
                  <CButton
                    className="mx-2"
                    color="success"
                    onClick={() => SetStatus("draft")}
                  >
                    Draft
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddNewPosts;
