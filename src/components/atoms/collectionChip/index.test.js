import { render, cleanup } from '@testing-library/react';
import CollectionChip from './index';
import { collectionChip } from 'test/fixtures/collections';

describe('<CollectionChip />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<CollectionChip chip={collectionChip} />).container;
  });

  afterEach(cleanup);

  it('should render correctly', () => {
    expect(wrapper.querySelectorAll('li.collection-chip')).toHaveLength(1);
  });

  it('should render the correct icon', () => {
    expect(
      wrapper.querySelector('a').style.getPropertyValue('--bg-img')
    ).toContain(collectionChip.icon);
  });

  it('should have the correct link', () => {
    expect(wrapper.querySelector('a').href).toBe(collectionChip.url);
  });

  it('should have the correct text', () => {
    expect(wrapper.textContent).toBe(collectionChip.title);
  });
});
