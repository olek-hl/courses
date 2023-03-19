import { useState } from "react";
import { Typography, Divider, Chip } from "@material-ui/core";
import { LockClock } from "@mui/icons-material";
import { toMinutesAndSeconds } from "../../services";
import {
  ICourseLesson,
  LessonStatus,
} from "../../containers/CourseView/logic/models";

import "./styles.css";

export interface ICourseLessonProps {
  lesson: ICourseLesson;
}

const CourceLesson = (props: ICourseLessonProps) => {
  const {
    lesson: { title, duration, order, status, link, previewImageLink },
  } = props;

  const isLocked = status === LessonStatus.Locked;

  return (
    <div className={`course-lesson-wrapper ${isLocked ? "locked" : ""}`}>
      <div className="lesson-duration-cell cell">
        <Typography
          variant="h6"
          component="span"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
        >
          {toMinutesAndSeconds(duration)}
        </Typography>
      </div>
      <div className="lesson-image-cell cell">
        <img
          src={`${previewImageLink}/lesson-${order}.webp`}
          alt="lesson-image"
        />
      </div>
      <div className="lesson-title-cell cell">
        <Typography
          variant="h6"
          component="span"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
      </div>
      <div className="lesson-status-cell cell">
        <LockClock />
      </div>
    </div>
  );
};

export default CourceLesson;
