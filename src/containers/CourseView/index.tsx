import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { connect, ConnectedProps } from "react-redux";
import { Loader, VideoComponent, Lesson } from "../../components";
import { IRootState } from "../../store/models";
import CourseViewActions from "./logic/actions";
import { ICourseViewReducer } from "./logic/models";

import "./styles.css";

export interface ICoursesOverview extends ConnectedProps<typeof connector> {
  actions: typeof CourseViewActions;
  courseData: ICourseViewReducer;
}

const CourseView = ({ actions, courseData }: ICoursesOverview) => {
  const [videoLink, setVideoLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    const courseId = location.pathname.split("/").pop();
    actions.getCourceData(courseId || "");
    return () => {
      actions.clearCourseData();
    };
  }, [actions, location.pathname]);

  useEffect(() => {
    const firstLessonLink = courseData.data?.lessons[0].link || "";
    setVideoLink(firstLessonLink);
  }, [courseData.data]);

  const { isFetching, data } = courseData;

  const isCurrentlyPlaying = (link: string) => {
    return link === videoLink;
  };

  const handleLessonClick = (link: string) => {
    setVideoLink(link);
  };

  if (isFetching || !data) {
    return <Loader isFullPage />;
  }

  return (
    <>
      <div className="course-lesson-video">
        <VideoComponent
          controls
          autoPlay
          videoUrl={videoLink || ""}
          position="static"
          muted
        />
      </div>
      <div className="course-view-wrapper">
        <div className="course-title-rating">
          <Typography
            variant={"h3"}
            component="div"
            style={{
              margin: "15px 15px 15px 0",
            }}
          >
            {courseData.data?.title}
          </Typography>
          <Rating
            value={courseData.data?.rating}
            readOnly
            style={{ position: "static" }}
            size="large"
          />
        </div>
        <div className="course-description">
          <Typography
            variant={"subtitle1"}
            component="p"
            style={{
              margin: "15px 0",
            }}
          >
            {courseData.data?.description}
          </Typography>
        </div>
        <Divider />
        <div className="course-lossons-list">
          {courseData.data?.lessons.map((lesson) => (
            <Lesson
              lesson={lesson}
              isCurrentlyPlaying={isCurrentlyPlaying}
              handleLessonClick={handleLessonClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  courseData: state.courseView,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...CourseViewActions }, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CourseView);
