import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SoomtutNavbar from '../SoomtutNavbar';

describe('SoomtutNavbar', () => {
  it('renders navbar', () => {
    render(<SoomtutNavbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has logo image', () => {
    render(<SoomtutNavbar />);
    expect(screen.getByAltText('')).toBeInTheDocument();
  });

  it('has login button', () => {
    render(<SoomtutNavbar />);
    expect(screen.getByText('로그인')).toBeInTheDocument();
  });

  it('has register button', () => {
    render(<SoomtutNavbar />);
    expect(screen.getByText('회원가입')).toBeInTheDocument();
});
});