import React from 'react';
import PropTypes from 'prop-types';

import {
  Nav,
  Ul,
  Li,
  StyledLink,
  StyledLabel,
} from './styles';

const Navbar = ({ url, links }) => (
  <Nav>
    <Ul>
      {links.map((link) => (
        <Li key={link.url}>
          {url === link.url || (Array.isArray(link.url) && link.url.includes(url))
            ? <StyledLabel>{link.label}</StyledLabel>
            : (
              <StyledLink to={Array.isArray(link.url) ? link.url[0] : link.url}>
                {link.label}
              </StyledLink>
            )}
        </Li>
      ))}
    </Ul>
  </Nav>
);

Navbar.propTypes = {
  url: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]).isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
};

export default Navbar;
