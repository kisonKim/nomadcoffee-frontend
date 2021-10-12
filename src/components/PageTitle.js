import { PropTypes } from "prop-types";
import { Helmet } from "react-helmet-async";

function PageTitle({title}) {
  return <Helmet>{title} | nomadcoffee </Helmet>
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PageTitle;