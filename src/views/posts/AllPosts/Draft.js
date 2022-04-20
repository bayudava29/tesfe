import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CTableBody,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { GetPosts, UpdatePosts } from "src/views/store/action/PostsAction";

const Draft = () => {
  const [state, setState] = useState([]);
  const payload = {
    status: "draft",
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

  return (
    <>
      <div className="my-3">Total Draft : {state.length}</div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Trashed</CTableHeaderCell>
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
                <div>
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

export default Draft;
