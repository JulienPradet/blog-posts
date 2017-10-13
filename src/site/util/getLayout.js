import Blog from "../Layout/Blog";
import Blank from "../Layout/Blank";

const layoutMap = {
  Blog: Blog,
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
