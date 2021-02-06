import React from 'react';
import { createCn } from 'bem-react-classname';
import './Amount.scss';

const cn = createCn('Amount');

interface Props {
  value: number
}

const Amount: React.FC<Props> = ({ value }: Props) => {
  const [ceils, cents] = value.toFixed(2).split('.');

  return (
    <div className={cn()}>
      <div>{ceils}</div>
      <div className={cn('cents')}>{cents}</div>
      <div className={cn('currency')}>€</div>
    </div>
  );
};

export default Amount;
