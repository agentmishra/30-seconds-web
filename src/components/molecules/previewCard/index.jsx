import Link from 'next/link';
import {
  CardIcon,
  CardTitle,
  CardSubtitle,
  cardClassName,
} from 'components/atoms/card';

/**
 * General-purpose snippet/collection preview card.
 * Used in listing pages and search results.
 * Dependent on the `Card` component.
 * @param {object} contentItem - Snippet or collection object for the card.
 */
const PreviewCard = ({ contentItem }) => (
  <li className={`${cardClassName} list-card grid`}>
    <CardIcon icon={contentItem.icon} type={contentItem.type} />
    <div className='card-data mx-2 my-0'>
      <CardTitle isSecondary>
        <Link href={contentItem.url}>
          <a className='inherit'>{contentItem.title}</a>
        </Link>
      </CardTitle>
      <CardSubtitle>{contentItem.tags}</CardSubtitle>
    </div>
    <div
      className='card-description'
      dangerouslySetInnerHTML={{ __html: `${contentItem.description}` }}
    />
  </li>
);

export default PreviewCard;
