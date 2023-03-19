import { useState, useMemo } from "react";
import { Typography, Divider, Chip } from "@material-ui/core";
import { LockClock, Pause, PlayCircle } from "@mui/icons-material";
import { toMinutesAndSeconds } from "../../services";
import {
  ICourseLesson,
  LessonStatus,
} from "../../containers/CourseView/logic/models";

import "./styles.css";

export interface ICourseLessonProps {
  lesson: ICourseLesson;
  paused: boolean;
  isCurrentlyPlaying: (link: string) => boolean;
  handleLessonClick: (link: string) => void;
}

const CourceLesson = (props: ICourseLessonProps) => {
  const {
    lesson: { title, duration, order, status, link, previewImageLink },
    paused,
    isCurrentlyPlaying,
    handleLessonClick,
  } = props;

  const isLocked = status === LessonStatus.Locked;

  const lessonStatusIcon = useMemo(() => {
    if (isLocked) {
      return <LockClock />;
    }
    if (isCurrentlyPlaying(link)) {
      return paused ? <PlayCircle color={"primary"} /> : <Pause />;
    }
    return <PlayCircle />;
  }, [isLocked, paused, isCurrentlyPlaying]);

  return (
    <div
      className={`course-lesson-wrapper ${isLocked ? "locked" : ""}`}
      onClick={() => (isLocked ? null : handleLessonClick(link))}
    >
      <div className="lesson-status-cell cell">{lessonStatusIcon}</div>
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
    </div>
  );
};

export default CourceLesson;
