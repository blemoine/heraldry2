import * as React from 'react';

import { PageState } from './model/pageState';
import { CSSProperties } from 'react';

const spanStyle: CSSProperties = { fontSize: '1.3rem', cursor: 'pointer', color: 'white', transition: 'all 0.3s' };
const openedSpanStyle: CSSProperties = { ...spanStyle, color: '#007bff', transform: 'rotate(45deg)' };

type Props = { pageState: PageState; toggleConfiguration: () => void };
export const Header = ({ pageState, toggleConfiguration }: Props) => {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container d-flex justify-content-between">
          <h1 className="navbar-brand d-flex align-items-center">Heraldry</h1>
          <span
            style={pageState.configurationOpened ? openedSpanStyle : spanStyle}
            onClick={() => toggleConfiguration()}
          >
            <i className="fas fa-cog" />
          </span>
        </div>
      </div>
    </header>
  );
};
