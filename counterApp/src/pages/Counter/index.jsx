import styles from "./index.less";
import { connect } from "dva";
const CountApp = (props) => (
  <div className={styles.normal}>
    <div className={styles.record}>
      <span className={styles.name}>{props.home.name}</span>最高分: {props.count.record}
    </div>
    <div className={styles.current}>当前分: {props.count.current}</div>
    <div className={styles.button}>
      <button
        onClick={() => {
          props.dispatch({ type: "count/add" });
        }}
      >
        +
      </button>
    </div>
  </div>
);
export default connect(state => state)(CountApp);
