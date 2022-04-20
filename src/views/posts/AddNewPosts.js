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
} from "@coreui/react";

const AddNewPosts = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Posts</strong>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Title</CFormLabel>
                <CFormInput type="text" id="title" placeholder="Title" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="content">Content</CFormLabel>
                <CFormTextarea id="content" rows="3"></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="category">Category</CFormLabel>
                <CFormInput type="text" id="category" placeholder="Category" />
              </div>
            </CForm>
            <CRow>
              <CCol xs={12}>
                <div className="d-flex justify-content-end">
                  <CButton color="primary" disabled>
                    Publish
                  </CButton>
                  <CButton className="mx-2" color="success" disabled>
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
