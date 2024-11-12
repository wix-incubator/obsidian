import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Example } from './Example';

async function prepare() {
}

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Example />
    </React.StrictMode>,
  );
});
