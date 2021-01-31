import React from 'react';
import { createCn } from 'bem-react-classname';
import './Panel.scss';

const cn = createCn('Panel');

interface Props {
  inactive?: boolean
}

const Panel: React.FC<Props> = ({ inactive, children }) => (
  <div className={cn({ inactive: inactive || false })}>
    {children}
  </div>
);

export default Panel;
