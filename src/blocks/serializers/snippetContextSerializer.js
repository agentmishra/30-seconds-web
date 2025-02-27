import pathSettings from 'settings/paths';
import JSX_SNIPPET_PRESETS from 'settings/jsxSnippetPresets';

export const snippetContextSerializer = {
  name: 'SnippetContextSerializer',
  methods: {
    code: snippet => {
      if (snippet.isCSS)
        return {
          html: snippet.htmlCode,
          css: snippet.cssCode,
          scopedCss: snippet.scopedCssCode,
          js: snippet.jsCode,
        };
      if (snippet.isReact) {
        /* eslint-disable camelcase */
        return {
          js: `${snippet.srcCode}\n\n${snippet.exampleCode}`,
          css: snippet.styleCode || '',
          html: JSX_SNIPPET_PRESETS.envHtml,
          js_pre_processor: JSX_SNIPPET_PRESETS.jsPreProcessor,
          js_external: JSX_SNIPPET_PRESETS.jsImports.join(';'),
        };
        /* eslint-enable camelcase */
      }
      return undefined;
    },
    author: snippet =>
      snippet.author
        ? {
            name: snippet.author.name,
            intro: snippet.author.intro,
            twitter: snippet.author.twitter,
            github: snippet.author.github,
          }
        : undefined,
    type: snippet => (snippet.isBlog ? snippet.type : undefined),
    coverUrl: snippet =>
      snippet.cover
        ? `/${pathSettings.staticAssetPath}/${snippet.cover}`
        : undefined,
    dateFormatted: snippet =>
      snippet.lastUpdated.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    fullDescription: snippet => snippet.fullDescriptionHtml,
  },
  attributes: [
    'title',
    'fullDescription',
    'codeBlocks',
    'url',
    'slug',
    ['dateFormatted', 'date'],
    'icon',
    ['formattedTags', 'tags'],
    'actionType',
    'code',
    'author',
    ['coverUrl', 'cover'],
  ],
};
