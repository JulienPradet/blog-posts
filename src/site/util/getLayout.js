import Home from "../Layout/Blog/Home";
import Post from "../Layout/Blog/Post";
import Blank from "../Layout/Blank";

const layoutMap = {
  Home: Home,
  Post: Post,
  Blank: Blank
};

const getLayout = layout => {
  if (!layout || !layoutMap[layout]) {
    return Blank;
  } else {
    return layoutMap[layout];
  }
};

export default getLayout;
