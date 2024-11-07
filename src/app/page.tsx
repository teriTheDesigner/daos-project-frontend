import FeedbackBanner from "./components/FeedbackBanner/FeedbackBanner";
import Footer from "./components/Footer/Footer";
import IndexHeader from "./components/IndexHeader/IndexHeader";
import LatestPostsSection from "./components/LatestPostsSection/LatestPostsSection";
import LoginForm from "./components/LoginForm/LoginForm";
import Nav from "./components/Nav/Nav";
import UserReviews from "./components/UserReviews/UserReviews";

export default function HomePage() {
  return (
    <div>
      <>
        <LoginForm />
        {/* <CreateUserForm /> */}
        <IndexHeader />
        <UserReviews />
        <LatestPostsSection />
        <FeedbackBanner />
        <Footer />
      </>
    </div>
  );
}
