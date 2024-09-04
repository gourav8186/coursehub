import "./Skeleton.css";
function SkeletonLoader() {
  return (
    <div className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3">
      <div className="skeleton-card">
        <div className="skeleton-thumbnail"></div>
        <div className="skeleton-course-price"></div>
        <div className="skeleton-course-name"></div>
        <div className="skeleton-course-desc"></div>
        <div className="skeleton-instructor"></div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
