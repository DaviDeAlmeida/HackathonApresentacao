import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Scrollable from '../scrollable/Scrollable';
import SidebarSwitcher from './sidebarSwitcher/SidebarSwitcher';

import {
  Container,
  SidebarContainer,
} from './styles';

const initialState = {
  isOpen: true,
};

class Sidebar extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  _toggleSidebar = () => this.setState((prev) => ({ isOpen: !prev.isOpen }));

  render() {
    const {
      children,
      afterToggle,
      collapsable,
      right,
      width,
      minWidth,
      column,
    } = this.props;

    const { isOpen } = this.state;

    return (
      <Container isOpen={isOpen}>
        {right && (
          <SidebarSwitcher
            isOpen={isOpen}
            collapsable={collapsable}
            onToggle={() => {
              this._toggleSidebar();
              afterToggle();
            }}
          />
        )}

        <SidebarContainer
          isOpen={isOpen}
          width={width}
          minWidth={minWidth}
          column={column}
        >
          <Scrollable>
            {children}
          </Scrollable>
        </SidebarContainer>

        {!right && (
          <SidebarSwitcher
            isOpen={isOpen}
            collapsable={collapsable}
            onToggle={() => {
              this._toggleSidebar();
              afterToggle();
            }}
            right
          />
        )}
      </Container>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  afterToggle: PropTypes.func,
  collapsable: PropTypes.bool,
  right: PropTypes.bool,
  width: PropTypes.number,
  minWidth: PropTypes.number,
  column: PropTypes.bool,
};

Sidebar.defaultProps = {
  right: false,
  afterToggle: () => {},
  collapsable: true,
  width: 250,
  minWidth: 200,
  column: false,
};

export default Sidebar;
