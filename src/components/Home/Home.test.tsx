import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';

jest.mock('../Profile', () => () => <div>Mock Profile</div>);
jest.mock('../Posts/PostList', () => () => <div>Mock PostList</div>);

describe('Home', () => {
  fit('deve renderizar a imagem central e os componentes filhos', () => {
    render(<Home />);
    expect(screen.getByAltText(/imagem central/i)).toBeInTheDocument();
    expect(screen.getByText(/mock profile/i)).toBeInTheDocument();
    expect(screen.getByText(/mock postlist/i)).toBeInTheDocument();
  });
});