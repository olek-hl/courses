import { useEffect } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { IRootState } from "../../store/models";
import CoursesOverviewActions from "./logic/actions";
import { ICoursesOvervieReducer } from "./logic/models";

export interface ICoursesOverview extends ConnectedProps<typeof connector> {
  actions: typeof CoursesOverviewActions;
  courses: ICoursesOvervieReducer;
}

const Courses = ({ actions, courses }: ICoursesOverview) => {
  useEffect(() => {
    actions.getCourcesOverview();
  }, [actions]);

  const { isFetching, data } = courses;

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Hello world!</h1>
      {data?.map((course) => {
        return <span style={{ display: "block" }}>{course.title}</span>;
      })}
    </>
  );
};

const mapStateToProps = (state: IRootState) => ({
  courses: state.coursesOverview,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ ...CoursesOverviewActions }, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Courses);
