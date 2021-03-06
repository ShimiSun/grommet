import { describe, PropTypes } from 'react-desc';

import { genericProps, getAvailableAtBadge } from '../../utils';

const fixedSizes = ['xsmall', 'small', 'medium', 'large', 'xlarge'];
const sizes = [
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'full',
  '1/2',
  '1/3',
  '2/3',
  '1/4',
  '2/4',
  '3/4',
  'flex',
  'auto',
];
const edgeSizes = ['small', 'medium', 'large', 'none'];

export const doc = Grid => {
  const DocumentedGrid = describe(Grid)
    .availableAt(getAvailableAtBadge('Grid'))
    .description(
      `A grid system for laying out content. To use, define the
rows and columns, create area names for adjacent cells, and then
place Box components inside those areas using the Box.gridArea property.
See https://css-tricks.com/snippets/css/complete-guide-grid/.
The availability of Grid can be tested via 'Grid.available'. Use this
to create fallback rendering for older browsers, like ie11.`,
    )
    .usage(
      `import { Grid } from 'grommet';
<Grid />`,
    );

  DocumentedGrid.propTypes = {
    ...genericProps,
    align: PropTypes.oneOf(['start', 'center', 'end', 'stretch'])
      .description(
        `How to align the individual items inside the grid when there is extra
space in the column axis.`,
      )
      .defaultValue('stretch'),
    alignContent: PropTypes.oneOf([
      'start',
      'center',
      'end',
      'between',
      'around',
      'stretch',
    ]).description('How to align the contents along the column axis.'),
    areas: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        start: PropTypes.arrayOf(PropTypes.number),
        end: PropTypes.arrayOf(PropTypes.number),
      }),
    ).description('Area names and column,row coordinates.'),
    columns: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.oneOf(sizes),
          PropTypes.arrayOf(PropTypes.oneOf(sizes)),
          PropTypes.string,
        ]),
      ),
      PropTypes.oneOf(fixedSizes),
      PropTypes.shape({
        count: PropTypes.oneOfType([
          PropTypes.oneOf(['fit', 'fill']),
          PropTypes.number,
        ]),
        size: PropTypes.oneOfType([
          PropTypes.oneOf(fixedSizes),
          PropTypes.arrayOf(PropTypes.oneOf(sizes)),
          PropTypes.string,
        ]),
      }),
      PropTypes.string,
    ]).description(
      `Column sizes.
      If an array value is an array, the inner array indicates the
      minimum and maximum sizes for the column.
      Specifying a single string will repeat multiple columns
      of that size, as long as there is room for more.
      Specifying an object allows indicating how the columns
      stretch to fit the available space.`,
    ),
    fill: PropTypes.oneOf(['horizontal', 'vertical', true, false]).description(
      'Whether the width and/or height should fill the container.',
    ),
    gap: PropTypes.oneOfType([
      PropTypes.oneOf(edgeSizes),
      PropTypes.shape({
        row: PropTypes.oneOfType([
          PropTypes.oneOf(edgeSizes),
          PropTypes.string,
        ]),
        column: PropTypes.oneOfType([
          PropTypes.oneOf(edgeSizes),
          PropTypes.string,
        ]),
      }),
      PropTypes.string,
    ]).description('Gap sizes between rows and/or columns.'),
    justify: PropTypes.oneOf(['start', 'center', 'end', 'stretch'])
      .description(
        `How to align the individual items inside the grid when there is extra
space in the row axis.`,
      )
      .defaultValue('stretch'),
    justifyContent: PropTypes.oneOf([
      'start',
      'center',
      'end',
      'between',
      'around',
      'stretch',
    ]).description('How to align the contents along the row axis.'),
    rows: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.oneOf(sizes),
          PropTypes.arrayOf(PropTypes.oneOf(sizes)),
          PropTypes.string,
        ]),
      ),
      PropTypes.oneOf(fixedSizes),
      PropTypes.string,
    ]).description(
      `Row sizes.
      If an array value is an array, the inner array indicates the
      minimum and maximum sizes for the row.
      Specifying a single string will cause automatically added rows to be
      the specified size.`,
    ),
    tag: PropTypes.string.description(
      `The DOM tag to use for the element. NOTE: This is deprecated in favor
of indicating the DOM tag via the 'as' property.`,
    ),
    as: PropTypes.string
      .description('The DOM tag to use for the element.')
      .defaultValue('div'),
  };

  return DocumentedGrid;
};
