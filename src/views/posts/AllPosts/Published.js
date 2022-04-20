import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CModalBody,
  CButton,
  CForm,
  CFormLabel,
  CFormTextarea,
  CFormInput,
  CCol,
  CRow,
  CToast,
  CToastBody,
  CToastHeader,
  CToastClose,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { GetPosts, UpdatePosts } from "src/views/store/action/PostsAction";

const styleToast = {
  position: "absolute",
  zIndex: 1,
  right: 50,
  top: 120
};

const Published = () => {
  const [state, setState] = useState([]);
  const [show, setShow] = useState(false);
  const initialEdit = {
    id: 0,
    title: "",
    content: "",
    category: "",
    status: "",
  };
  const [edit, setEdit] = useState(initialEdit);
  const [isEdit, setIsEdit] = useState(false);
  const initialValidationMessage = {
    type: null,
    message: "",
  };
  const [validationMessage, setValidationMessage] = useState(
    initialValidationMessage
  );
  const payload = {
    status: "publish",
  };

  useEffect(() => {
    if (state.length === 0) {
      GetPosts(payload).then((res) => {
        const data = res.data;
        if (data.status == "success") {
          setState((state) => [...data.data.data]);
        }
      });
    }
  }, [state]);

  const showModal = (payload) => {
    setEdit({
      id: payload.id,
      title: payload.title,
      content: payload.content,
      category: payload.category,
      status: payload.status,
    });
    setShow(true);
  };

  const SetTitle = (e) => setEdit({ ...edit, title: e });
  const SetContent = (e) => setEdit({ ...edit, content: e });
  const SetCategory = (e) => setEdit({ ...edit, category: e });
  const SetStatus = (e) => setEdit({ ...edit, status: e });

  useEffect(() => {
    if (isEdit) {
      UpdatePosts({
        id: edit.id,
        title: edit.title,
        category: edit.category,
        status: edit.status,
      }).then((res) => {
        if (res.data.status == "success") {
          GetPosts(payload).then((res) => {
            const data = res.data;
            if (data.status == "success") {
              setState((state) => [...data.data.data]);
              setShow(false);
              setEdit(initialEdit);
            }
          });
        } else {
          const error = res.data.data.errors;
          for (const err in error) {
            error[err].map((item) => {
              setValidationMessage({
                type: "Validation Exception!",
                message: item,
              });
            });
          }
        }
      });
      setIsEdit(false);
    }
  }, [isEdit]);

  return (
    <>
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
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        <CModal
          className="show d-block position-static"
          backdrop={false}
          keyboard={false}
          portal={false}
          visible={show}
          onClose={() => {
            setShow(false);
            setEdit(initialEdit);
          }}
        >
          <CModalHeader>
            <CModalTitle>Edit</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  placeholder="Title"
                  onChange={(e) => SetTitle(e.target.value)}
                  value={edit.title}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="content">Content</CFormLabel>
                <CFormTextarea
                  id="content"
                  rows="3"
                  onChange={(e) => SetContent(e.target.value)}
                  value={edit.content}
                ></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="category">Category</CFormLabel>
                <CFormInput
                  type="text"
                  id="category"
                  placeholder="Category"
                  onChange={(e) => SetCategory(e.target.value)}
                  value={edit.category}
                />
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CRow>
              <CCol xs={12}>
                <div className="d-flex justify-content-end">
                  <CButton
                    color="primary"
                    onClick={() => {
                      SetStatus("publish");
                      setIsEdit(true);
                    }}
                  >
                    Publish
                  </CButton>
                  <CButton
                    className="mx-2"
                    color="success"
                    onClick={() => {
                      SetStatus("draft");
                      setIsEdit(true);
                    }}
                  >
                    Draft
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CModalFooter>
        </CModal>
      </div>
      <div className="my-3">Total Published : {state.length}</div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        {state?.map((item, i) => (
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">{i + 1}</CTableHeaderCell>
              <CTableDataCell>{item.title}</CTableDataCell>
              <CTableDataCell>{item.category}</CTableDataCell>
              <CTableDataCell>{item.status}</CTableDataCell>
              <CTableDataCell>
                <div className="d-flex">
                  <div
                    onClick={() => {
                      showModal(item);
                    }}
                    style={{ cursor: "pointer", color: "green" }}
                  >
                    Edit
                  </div>
                  <div>|</div>
                  <div
                    onClick={() => {
                      UpdatePosts({
                        id: item.id,
                        title: item.title,
                        category: item.category,
                        status: "thrash",
                      }).then(() => {
                        GetPosts(payload).then((res) => {
                          const data = res.data;
                          if (data.status == "success") {
                            setState((state) => [...data.data.data]);
                          }
                        });
                      });
                    }}
                    style={{ cursor: "pointer", color: "red" }}
                  >
                    Trashed
                  </div>
                </div>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        ))}
      </CTable>
    </>
  );
};

export default Published;
