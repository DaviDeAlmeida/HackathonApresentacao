import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FiMenu, FiFilter } from 'react-icons/fi';
import { MdDateRange, MdMoreVert, MdClose } from 'react-icons/md';

import {
  Wrapper,
  MenuButton,
  StyledTitle,
  StyledCenterTitle,
  RightButton,
  MoreButton,
} from './styles';

const getTitle = (isFiltersOpen, isStatusOpen, url) => (isFiltersOpen
  ? 'Filtros'
  : isStatusOpen
    ? 'Selecione o status'
    : url === '/'
      ? 'Pedidos'
      : 'Entregas');

const HeaderMobile = (props) => {

  const {
    url,
    isStatusOpen,
    toggleStatusOpen,
    isFiltersOpen,
    toggleFiltersOpen,
  } = props;

  const label = getTitle(isFiltersOpen, isStatusOpen, url);

  const TitleElement = isStatusOpen || isFiltersOpen ? StyledCenterTitle : StyledTitle;

  return (
    <Wrapper>
      {!isStatusOpen && !isFiltersOpen && (
        <MenuButton><FiMenu /></MenuButton>
      )}
      <TitleElement>{label}</TitleElement>
      {!isStatusOpen && !isFiltersOpen && (
        <Fragment>
          <RightButton onClick={toggleFiltersOpen}><FiFilter /></RightButton>
          <RightButton><MdDateRange /></RightButton>
          <MoreButton><MdMoreVert /></MoreButton>
        </Fragment>
      )}
      {isStatusOpen && (
        <RightButton onClick={toggleStatusOpen}><MdClose /></RightButton>
      )}
      {isFiltersOpen && (
        <RightButton onClick={toggleFiltersOpen}><MdClose /></RightButton>
      )}
    </Wrapper>
  );

};

HeaderMobile.propTypes = {
  url: PropTypes.string.isRequired,
  isStatusOpen: PropTypes.bool.isRequired,
  isFiltersOpen: PropTypes.bool.isRequired,
  toggleStatusOpen: PropTypes.func.isRequired,
  toggleFiltersOpen: PropTypes.bool.isRequired,
};

export default HeaderMobile;
