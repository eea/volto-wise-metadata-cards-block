import MetadataCardsView from './View';
import MetadataCardsEdit from './Edit';
import worldSVG from '@plone/volto/icons/world.svg';

export default (config) => {
  config.blocks.blocksConfig.metadataCardsBlock = {
    id: 'metadataCardsBlock',
    title: 'Metadata cards',
    icon: worldSVG,
    group: 'common',
    view: MetadataCardsView,
    edit: MetadataCardsEdit,
    restricted: false,
    mostUsed: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  return config;
};
