import installmetadataCardsBlock from './MetadataCardsBlock';
import { AttachedImageWidget } from '@eeacms/volto-block-image-cards/ImageCards/widgets';

const applyConfig = (config) => {
  if (!config.widgets.widget.attachedimage) {
    config.widgets.widget.attachedimage = AttachedImageWidget;
  }

  return [installmetadataCardsBlock].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
