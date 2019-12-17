import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import Scrollable from '../scrollable/Scrollable';
import Sidebar from '../sidebar/Sidebar';
import Toolbar from '../toolbar/Toolbar';
import ToolbarButton from '../toolbar/button/ToolbarButton';
import {
  Container,
  Wrapper,
  Content,
  Header,
  Trail,
  Step,
} from './styles';

import ok from './images/wizard-ok.svg';
import on from './images/wizard-on.svg';
import off from './images/wizard-off.svg';
import split from './images/wizard-split.svg';

const Wizard = ({
  title,
  steps,
  onCancel,
  onFinish,
}) => {
  const [current, setCurrent] = useState(0);
  const last = steps.length - 1;

  const getIcon = (i) => {
    if (i < current) return ok;
    if (i === current) return on;
    return off;
  };

  return (
    <Container>
      <Wrapper>
        {title && <Header>{title}</Header>}
        <Content>
          {steps[current].content}
        </Content>
      </Wrapper>
      <Sidebar right>
        <Scrollable>
          <Trail>
            {steps.map((step, i) => (
              <Fragment key={step.title}>
                {i !== 0 && <img src={split} alt="" />}
                <Step
                  icon={getIcon(i)}
                  current={i === current}
                  onClick={() => setCurrent(i)}
                >
                  {step.title}
                </Step>
              </Fragment>
            ))}
          </Trail>
        </Scrollable>
      </Sidebar>
      <Toolbar>
        {current === last && <ToolbarButton text="Concluir" onClick={onFinish} />}
        {current < last && (
          <ToolbarButton
            primary
            text="Próximo"
            onClick={() => setCurrent(current + 1)}
            disabled={steps[current].condition === false}
          />
        )}
        <ToolbarButton
          text="Anterior"
          onClick={() => setCurrent(current - 1)}
          disabled={current === 0}
        />
        {onCancel && <ToolbarButton text="Cancelar" onClick={onCancel} />}
        {steps[current].options}
      </Toolbar>
    </Container>
  );
};

Wizard.propTypes = {
  title: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    condition: PropTypes.bool,
  })).isRequired,
  onFinish: PropTypes.func,
  onCancel: PropTypes.func,
};

Wizard.defaultProps = {
  title: undefined,
  onFinish: undefined,
  onCancel: undefined,
};

export default Wizard;
