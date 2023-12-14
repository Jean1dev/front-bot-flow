//import { Helmet } from 'react-helmet-async'; analisar o uso futuramente
import PropTypes from 'prop-types';

export const Seo = (props) => {
  const { title } = props;

  const fullTitle = title
    ? title + ' | Devias Kit PRO'
    : 'Devias Kit PRO';

  return (
    <>
      <title>
        {fullTitle}
      </title>
    </>
  );
};

Seo.propTypes = {
  title: PropTypes.string,
};
