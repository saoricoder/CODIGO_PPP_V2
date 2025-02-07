import { render, screen } from '@testing-library/react';
import { TextEncoder, TextDecoder } from 'util';

import { BrowserRouter } from 'react-router-dom';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

test('Render de la Aplicación', () => {

  render(
    <BrowserRouter>
      
    </BrowserRouter>
  );

});
