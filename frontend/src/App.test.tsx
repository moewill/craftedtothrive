import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the app title', () => {
    render(<App />);
    expect(screen.getByText('Podcast Planner Web App')).toBeInTheDocument();
  });

  it('shows Tailwind CSS is working message', () => {
    render(<App />);
    expect(screen.getByText('Tailwind CSS with custom brand colors is working!')).toBeInTheDocument();
  });
});