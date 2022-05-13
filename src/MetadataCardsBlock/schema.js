import config from '@plone/volto/registry';

const Card = () => ({
  title: 'Card',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'source',
        'title',
        'description',
        'hide_description',
        'attachedimage',
        'item_type',
      ],
    },
  ],

  properties: {
    source: {
      widget: 'object_browser',
      mode: 'link',
      title: 'Source',
      description: 'Choose an existing content as source for this card',
    },
    title: {
      type: 'string',
      title: 'Title',
    },
    description: {
      type: 'textarea',
      title: 'Description',
    },
    hide_description: {
      type: 'boolean',
      title: 'Hide description',
    },
    attachedimage: {
      widget: 'attachedimage',
      title: 'Image',
      description: 'Override or upload a new image',
    },
    item_type: {
      type: 'string',
      title: 'Type of item',
    },
  },

  required: ['attachedimage'],
});

const MetadataCards = (props) => {
  return {
    title: 'Metadata Cards',

    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'text', 'align', 'cards'],
      },
      {
        id: 'style',
        title: 'Cards styling',
        fields: [
          'image_scale',
          'image_height',
          'border_color',
          'text_align',
          'cards_per_row',
        ],
      },
    ],

    properties: {
      title: {
        type: 'string',
        title: 'Title',
      },
      text: {
        widget: 'slate_richtext',
        title: 'Text',
      },
      cards: {
        widget: 'object_list',
        title: 'Cards',
        schema: Card,
      },
      image_scale: {
        type: 'string',
        title: 'Image scale',
        default: 'large',
      },
      align: {
        title: 'Alignment',
        widget: 'align',
        type: 'string',
      },
      border_color: {
        widget: 'style_simple_color',
        title: 'Top border color',
        type: 'color',
        available_colors: config.settings.available_colors,
      },
      image_height: {
        type: 'string',
        title: 'Image height',
        default: '220px',
      },
      cards_per_row: {
        title: 'Cards per row',
        type: 'number',
        description:
          'A group of cards can set how many cards should exist in a row.',
      },
      text_align: {
        title: 'Text align',
        widget: 'text_align',
        default: 'left',
      },
    },

    required: ['cards'],
  };
};

export default MetadataCards;
