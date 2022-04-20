import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import Published from "./AllPosts/Published";
import Draft from "./AllPosts/Draft";
import Trashed from "./AllPosts/Trashed";

const AllPosts = () => {
  const [state, setSate] = useState({
    tabs: ["Published", "Draft", "Trashed"],
    activeTab: "Published",
  });

  const setActiveTab = (tab) =>
    setSate({
      ...state,
      activeTab: tab,
    });

  const ActiveTabPage = () => {
    switch (state.activeTab) {
      case "Publised":
        return (
          <>
            <Published />
          </>
        );
        break;
      case "Draft":
        return (
          <>
            <Draft />
          </>
        );
        break;
      case "Trashed":
        return (
          <>
            <Trashed />
          </>
        );
        break;
      default:
        return (
          <>
            <Published />
          </>
        );
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Posts</strong>
          </CCardHeader>
          <CCardBody>
            <CNav variant="tabs">
              {state.tabs?.map((tab, i) => (
                <CNavItem key={i}>
                  <CNavLink
                    href="javascript:void(0)"
                    onClick={() => setActiveTab(tab)}
                    active={state.activeTab === tab ? true : false}
                  >
                    {tab}
                  </CNavLink>
                </CNavItem>
              ))}
            </CNav>
            <ActiveTabPage />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AllPosts;
