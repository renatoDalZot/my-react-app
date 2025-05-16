import centralImage from "../../assets/images/centralImage.png";
import PostList from "../Posts/PostList";
import Profile from "../Profile";
import BemVindo from "../Props";

function Home() {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>      
      <img
        src={centralImage}
        alt="Imagem central"
        style={{ width: "100%", maxWidth: "600px", marginBottom: "20px" }}
      />      
      <Profile />      
      <PostList />      
    </div>
  );
}

export default Home;