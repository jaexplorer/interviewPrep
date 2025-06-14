import { assert, expect, test } from 'vitest';
import Home from './Home';
import { render, screen } from '../../test-utils';
import userEvent from '@testing-library/user-event';
import moment from 'moment';

test('Display current time', async () => {
  render(<Home />);
  const text = screen.getByText(/Current Time: /i);
  expect(text).toBeInTheDocument();

  const now = moment().format('h:mmA');
  expect(text.textContent).toBe(`Current Time: ${now}`);

  await userEvent.click(text);
  expect(screen.getByText(/Current Time: /i)).toBeInTheDocument();
});
