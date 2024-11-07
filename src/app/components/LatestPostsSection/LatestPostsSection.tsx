import PostingCard from "../PostingCard/PostingCard";
import styles from "./LatestPostsSection.module.css";

export default function LatestPostsSection() {
  return (
    <section className={`${styles.section} outer-grid`}>
      <div className={`inner-grid`}>
        <h2 className={`${styles.h2} oswald-medium`}>Seneste Opslag</h2>
        <div className={styles.postsLayout}>
          {Array.from({ length: 7 }).map((_, index) => (
            <PostingCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
