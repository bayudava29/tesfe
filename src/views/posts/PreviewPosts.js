import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CCardTitle,
  CCardText,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { GetPostsPage } from "src/views/store/action/PostsAction";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";

const PreviewPosts = () => {
  const [state, setState] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [payload, setPayload] = useState({
    status: "publish",
    pageNumber: 1,
  });

  useEffect(() => {
    if (state.length === 0) {
      GetData();
    }
  }, [state]);

  useEffect(() => {
    GetData();
  }, [payload]);

  const handlePageClick = (event) => {
    setPayload({
      ...payload,
      pageNumber: event.selected + 1,
    });
  };

  const GetData = () => {
    GetPostsPage(payload).then((res) => {
      const data = res.data;
      if (data.status == "success") {
        setState((state) => [...data.data.data]);
        setPageCount(data.data.last_page);
      }
    });
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Preview Posts</strong>
          </CCardHeader>
          <CCardBody>
            <div
              style={{
                height: "50vh",
                overflow: "auto",
              }}
            >
              <CRow>
                {state?.map((item, i) => (
                  <CCol xs={4} className="my-2" key={i}>
                    <CCard style={{ width: "18rem" }}>
                      <CCardBody>
                        <CCardTitle>{item.title}</CCardTitle>
                        <CCardText>{item.content.substr(0, 100)}...</CCardText>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            </div>
            <div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                className="_paginate"
                pageClassName="page-paginate"
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PreviewPosts;
