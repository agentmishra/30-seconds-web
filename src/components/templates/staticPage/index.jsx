import Meta from 'components/organisms/meta';
import PageTitle from 'components/atoms/pageTitle';
import Card, { CardTitle } from 'components/atoms/card';
import Shell from 'components/organisms/shell';
import { useShell } from 'state/shell';

/**
 * Renders a static page from the given data.
 * Responsible for rendering the /about and /cookies pages.
 * @param {object} stringLiterals - An object with all the necessary information
 *   for rendering this page. The `cards` array will hold title+html pairs for
 *   each `Card` rendered.
 */
const StaticPage = ({
  stringLiterals: {
    title,
    subtitle,
    pageDescription,
    cards,
    cookieSettingCard = null,
  },
}) => {
  const [{ acceptsCookies }, dispatch] = useShell();
  // This is not particularly resilient, but should work for now
  const isFaq = title === 'FAQ';

  return (
    <>
      <Meta title={title} description={pageDescription} />
      <Shell isFaq={isFaq}>
        <div className='g-c2'>
          <PageTitle>{title}</PageTitle>
          <p className='my-0 mx-3.5 txt-100'>{subtitle}</p>
          {cards.map(({ title, html }, i) => (
            <Card
              key={i}
              {...(isFaq
                ? {
                    itemScope: true,
                    itemProp: 'mainEntity',
                    itemType: 'https://schema.org/Question',
                  }
                : {})}
            >
              <CardTitle isSecondary {...(isFaq ? { itemProp: 'name' } : {})}>
                {title}
              </CardTitle>
              <div
                {...(isFaq
                  ? {
                      itemScope: true,
                      itemProp: 'acceptedAnswer',
                      itemType: 'https://schema.org/Answer',
                    }
                  : {})}
                className='card-description'
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Card>
          ))}
          {cookieSettingCard ? (
            <Card>
              <CardTitle isSecondary>{cookieSettingCard.title}</CardTitle>
              <div className='card-description'>
                <p>{cookieSettingCard.text}</p>
                <label className='flex a-center md:fs-md mt-2'>
                  <input
                    className='mr-2'
                    defaultChecked={!!acceptsCookies}
                    type='checkbox'
                    onChange={() => {
                      dispatch({
                        type: 'decideCookies',
                        acceptsCookies: !acceptsCookies,
                      });
                      // Force reload the page if cookies are now disabled
                      if (acceptsCookies)
                        setTimeout(() => window.location.reload(), 300);
                    }}
                  />
                  {cookieSettingCard.toggleText}
                </label>
              </div>
            </Card>
          ) : null}
        </div>
      </Shell>
    </>
  );
};

export default StaticPage;
