import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  Label,
} from './styles';

const File = ({
  text,
  accept,
  onChange,
  showInfo,
}) => {
  const [info, setInfo] = useState(null);

  return (
    <Label>
      <Input
        type="file"
        accept={accept}
        onChange={(e) => {
          if (e.target.files.length > 1) setInfo(`${e.target.files.length} arquivos selecionados.`);
          else setInfo(e.target.files[0].name);

          onChange(e);
        }}
      />
      {(showInfo && info) || (text || 'Escolha um arquivo')}
    </Label>
  );
};

File.propTypes = {
  text: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  showInfo: PropTypes.bool,
};

File.defaultProps = {
  text: undefined,
  accept: undefined,
  showInfo: false,
};

export default File;
