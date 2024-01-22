import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProvider } from "./Contexts/userContext";
import { NotificationProvider } from "./Contexts/notificationContext";
import { Container } from "react-bootstrap";
import AppNavbar from "./Components/AppNavbar/AppNavbar";
import Footer from "./Components/Footer/Footer";
import AppSidebar from "./Components/AppSideBar/AppSidebar";
import Home from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Login from "./Pages/Login/Login";
import LoginNavbar from "./Components/LoginNavbar/LoginNavbar";
import Logout from "./Pages/Logout/Logout";
import LoaderOne from "./Components/Subcomponents/loader/LoaderOne";
import FormsRepository from "./Pages/FormsRepository/FormsRepository";
import Wiki from "./Pages/Wiki/Wiki";
import AppQuickLinksBar from "./Components/AppQuickLinksBar/AppQuickLinksBar";
import ComposeArticle from "./Pages/ComposeArticle/ComposeArticle";
import ArticleViewer from "./Pages/ArticleViewer/ArticleViewer";
import EditArticle from "./Pages/EditArticle/EditArticle";
import MyProfile from "./Pages/MyProfile/MyProfile";
import TeamDirectory from "./Pages/TeamDirectory/TeamDirectory";
import NewsAndUpdates from "./Pages/NewsAndUpdates/NewsAndUpdates";
import MyCalendar from "./Pages/MyCalendar/MyCalendar";

function App() {
  const [acknowledgeClick, setAcknowledgeClicked] = useState(false);
  const [updatePosted, setUpdatePosted] = useState(false);
  const [isInCompose, setIsInCompose] = useState(false);
  const [isInArticleView, setIsInArticleView] = useState(false);
  const [isInEditArticleView, setIsInEditArticleView] = useState(false);
  const [isUserHovered, setIsUserHovered] = useState(true);
  const [isDoneInitializing, setIsDoneInitialing] = useState(false);
  const [user, setUser] = useState({
    id: null,
    firstName: null,
    lastName: null,
    jobTitle: null,
    isManager: null,
    department: null,
  });

  const unsetUser = () => {
    localStorage.clear();
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users/user/detail`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data = data.result;
        if (typeof data !== "undefined") {
          setUser({
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            jobTitle: data.jobTitle,
            isManager: data.isManager,
            profilePicture: data.profilePictureUrl,
            department: data.department,
          });

          setIsDoneInitialing(true);
        } else {
          setUser({
            id: null,
            firstName: null,
            lastName: null,
            jobTitle: null,
            isManager: null,
            profilePicture: null,
            department: null,
          });

          setIsDoneInitialing(true);
        }
      });
  }, [user.id]);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <NotificationProvider
        value={{
          updatePosted,
          setUpdatePosted,
          acknowledgeClick,
          setAcknowledgeClicked,
        }}
      >
        <Router>
          <Container fluid style={{ minHeight: "100vh", padding: "0" }}>
            {isDoneInitializing ? (
              <div style={{ display: 'flex', flexDirection: "column" , alignItems: "center" }}>
                <div className="col-12 sticky-top pr-0 pl-0 navbar-min-height">
                  {user.id == null ? (
                    <LoginNavbar />
                  ) : (
                    <>
                      <AppNavbar
                        setIsUserHovered={setIsUserHovered}
                        setIsInCompose={setIsInCompose}
                        setIsInArticleView={setIsInArticleView}
                        setIsInEditArticleView={setIsInEditArticleView}
                      />
                      {isUserHovered ? <></> : <></>}
                    </>
                  )}
                </div>
                {user.id === null ? (
                  <Login />
                ) : isInCompose ? (
                  <ComposeArticle />
                ) : (
                  <>
                    {isInArticleView || isInEditArticleView ? (
                      <Routes>
                        <Route
                          path="/article/:articleId"
                          element={<ArticleViewer />}
                        />
                        <Route
                          path="/article/edit/:articleId"
                          element={<EditArticle />}
                        />
                      </Routes>
                    ) : (
                      <>
                        <section className="mainContainer">
                          <div className="sidebar">
                            <AppSidebar />
                          </div>
                          <div className="mainContent">
                            {/* <div className='' style={{}}> */}
                            <Routes>
                              <Route path="/" element={<Home />} />
                              <Route
                                path="/forms-repository"
                                element={<FormsRepository />}
                              />
                              <Route path="/wiki" element={<Wiki />} />
                              <Route
                                path="/my-profile/*"
                                element={<MyProfile />}
                              />
                              <Route
                                path="/my-calendar/*"
                                element={<MyCalendar />}
                              />
                              <Route
                                path="/team-directory"
                                element={<TeamDirectory />}
                              />
                              <Route
                                path="/news-and-updates"
                                element={<NewsAndUpdates />}
                              />
                              <Route path="/login" element={<Login />} />
                              <Route path="/logout" element={<Logout />} />
                              <Route path="*" element={<PageNotFound />} />
                            </Routes>
                            {/* </div> */}
                          </div>
                          <div className="linksbar">
                            <AppQuickLinksBar />
                          </div>
                        </section>
                      </>
                    )}
                  </>
                )}
                <div className="col-12 pr-0 pl-0 mt-auto">
                  <Footer />
                </div>
              </div>
            ) : (
              <>
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "100vh" }}
                >
                  <LoaderOne />
                </div>
              </>
            )}
          </Container>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
