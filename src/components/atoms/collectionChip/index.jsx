import Link from 'next/link';

/**
 * General-purpose collection chip.
 * Used in home page and collections page.
 * @param {object} chip - Collection chip object for the chip.
 */
const CollectionChip = ({ chip }) => (
  <li className='collection-chip srfc-01db txt-200 br-xl'>
    <Link href={chip.url}>
      <a
        className='inherit relative py-2 px-1 f-center flex j-center a-center f-alt box-border before:fs-lg'
        style={{ '--bg-img': `url(/assets/icons/${chip.icon}.svg)` }}
      >
        {chip.title}
      </a>
    </Link>
  </li>
);

export default CollectionChip;
