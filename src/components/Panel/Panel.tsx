import React from 'react';
import { createCn } from 'bem-react-classname';
import './Panel.scss';

const cn = createCn('Panel');

interface Props {
  inactive?: boolean
  children: React.ReactNode
}

const Panel: React.FC<Props> = ({ inactive, children }: Props) => (
  <div className={cn({ inactive: inactive || false })}>
    {children}
  </div>
);

export default Panel;
