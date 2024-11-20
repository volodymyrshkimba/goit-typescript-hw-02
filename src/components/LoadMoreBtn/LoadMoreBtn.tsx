import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn = ({ onLoadMore }: LoadMoreBtnProps) => {
  return (
    <button className={css.btn} type="button" onClick={onLoadMore}>
      <p>Load More</p>
    </button>
  );
};

export default LoadMoreBtn;
