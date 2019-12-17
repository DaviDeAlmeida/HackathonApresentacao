
import React from 'react';
import PropTypes from 'prop-types';
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

import colors from '../../../../colors';

import {
  Container,
  SidebarSwitcherButton,
  SidebarSwitcherTrail,
} from './styles';

const SidebarSwitcher = (props) => {
  const {
    onToggle,
    isOpen,
    right,
    collapsable,
  } = props;

  const arrow = right
    ? <MdKeyboardArrowRight size={24} color={colors.blueD} />
    : <MdKeyboardArrowLeft size={24} color={colors.blueD} />;

  return (
    <Container isOpen={isOpen} right={right}>
      {collapsable && (
        <SidebarSwitcherButton
          isOpen={isOpen}
          onClick={onToggle}
          role="button"
        >
          {arrow}
        </SidebarSwitcherButton>
      )}
      <SidebarSwitcherTrail />
    </Container>
  );

};

SidebarSwitcher.propTypes = {
  right: PropTypes.bool,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  collapsable: PropTypes.bool,
};

SidebarSwitcher.defaultProps = {
  isOpen: true,
  right: false,
  collapsable: true,
};

export default SidebarSwitcher;
