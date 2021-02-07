import React from 'react';
import { createCn } from 'bem-react-classname';
import './Amount.scss';

const cn = createCn('Amount');

interface Props {
  value: number
}

const Amount: React.FC<Props> = ({ value }: Props) => {
  const [main, fractional] = value.toFixed(2).split('.');

  return (
    <div className={cn()}>
      <div>{main}</div>
      <div className={cn('fractional')}>{fractional}</div>
      <div className={cn('currency')}>€</div>
    </div>
  );
};

export default Amount;
