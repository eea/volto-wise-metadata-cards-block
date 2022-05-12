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
        fields: ['title', 'text', 'align', 'image_scale', 'cards'],
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
    },

    required: ['cards'],
  };
};

export default MetadataCards;
