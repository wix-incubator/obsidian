import { expect, describe } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Example } from '.';

describe('Example', () => {
  it('should render hello', async () => {
    render(<Example />);

    await waitFor(() =>
      expect(screen.getByText('hello')).toBeInTheDocument(),
    );
  });
});
