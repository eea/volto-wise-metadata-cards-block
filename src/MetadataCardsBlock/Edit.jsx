import React from 'react';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import View from './View';
import getSchema from './schema';

const Edit = (props) => {
  const schema = getSchema(props);
  const { data = {}, block = null, selected = false, onChangeBlock } = props;
  const { cards = [] } = data;
  const [refresh, forceRefresh] = React.useState(0);

  React.useEffect(() => {
    cards.forEach((card, index) => {
      if (card.source?.length && !card.title) {
        card.title = card.source[0].title;
        card.description = card.source[0].Description;
        card.link = card.source[0].getURL;
        card.item_type = card.source[0]?.Type;
        forceRefresh(refresh + 1);
      }
    });
  }, [cards, refresh]);

  return (
    <>
      <View {...props} mode="edit" />

      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default Edit;
