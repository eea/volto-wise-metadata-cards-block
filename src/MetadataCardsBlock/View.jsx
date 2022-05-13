import React from 'react';
import { Card, Message } from 'semantic-ui-react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import cx from 'classnames';
import config from '@plone/volto/registry';
import { BodyClass } from '@plone/volto/helpers';
import { serializeNodes } from 'volto-slate/editor/render';
import { MetadataModal } from './components';
import { getScaleUrl, getPath } from './../utils';

import './less/style.less';

export const CardItem = (props) => {
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({});
  const {
    source,
    title,
    description,
    hide_description,
    item_type,
    border_color,
    attachedimage,
    image_height = '220px',
    image_scale,
  } = props;

  const leadImage = source?.[0]?.lead_image;

  const close = (item) => {
    setOpenModal(false);
    setSelectedItem({});
  };

  return (
    <>
      <div
        className="ui card metadata-card has-link"
        style={
          border_color
            ? {
                borderTop: `8px solid ${border_color}`,
              }
            : {}
        }
        onClick={() => {
          setOpenModal(true);
          setSelectedItem(props);
        }}
        onKeyDown={() => setSelectedItem(props)}
        role="button"
        tabIndex="0"
      >
        <div className="content metadata-card-content">
          <div className="metadata-card-wrapper">
            <>
              {leadImage && !attachedimage ? (
                <LazyLoadComponent>
                  <div
                    className="metadata-card-image"
                    style={{
                      backgroundImage: `url(${props.source?.[0]['@id']
                        .replace(config.settings.apiPath, '')
                        .replace(
                          config.settings.internalApiPath,
                          '',
                        )}/@@images/image/${image_scale || 'large'})`,
                      minHeight: `${image_height}`,
                    }}
                  ></div>
                </LazyLoadComponent>
              ) : (
                <LazyLoadComponent>
                  <div
                    className="metadata-card-image"
                    style={
                      attachedimage
                        ? {
                            backgroundImage: `url(${getScaleUrl(
                              getPath(attachedimage),
                              image_scale || 'large',
                            )})`,
                            minHeight: `${image_height}`,
                          }
                        : {}
                    }
                  ></div>
                </LazyLoadComponent>
              )}

              <div className="metadata-cards-content-wrapper">
                {title && <h3 className="metadata-card-header">{title}</h3>}

                {!hide_description && description && (
                  <div className="metadata-card-description">
                    <p>{description}</p>
                  </div>
                )}
              </div>
            </>
          </div>
        </div>

        {item_type && <div className="extra content">{item_type}</div>}
      </div>

      <MetadataModal
        {...props}
        isOpen={isOpenModal}
        isOnClose={close}
        item={selectedItem}
      />
    </>
  );
};

const MetadataCards = (props) => {
  const { data = {}, editable } = props;
  const {
    title,
    text,
    cards,
    border_color,
    image_height,
    image_scale,
    cards_per_row,
    custom_class,
    text_align = 'left',
  } = data;

  return (
    <>
      {cards && cards.length > 0 ? (
        <div
          className={cx(
            'block align metadata-cards-block metadata-cards-block',
            custom_class,
          )}
        >
          <BodyClass className="has-card-tiles" />
          <div className="metadata-cards-grid-wrapper">
            <div className="metadata-cards-grid">
              {title && <h2 className="metadata-cards-grid-title">{title}</h2>}

              {text && (
                <div className="metadata-cards-grid-description">
                  {serializeNodes(text)}
                </div>
              )}

              <div style={{ textAlign: `${text_align}` }}>
                <Card.Group
                  className="metadata-cards"
                  {...(cards_per_row && cards_per_row > 0
                    ? { itemsPerRow: cards_per_row }
                    : {})}
                >
                  {(cards || []).map((card, index) => (
                    <CardItem
                      key={index}
                      {...card}
                      border_color={border_color}
                      image_height={image_height}
                      image_scale={image_scale}
                    />
                  ))}
                </Card.Group>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {editable ? (
            <Message warning>
              <Message.Header>No cards</Message.Header>
              <p>Add cards from the sidebar.</p>
            </Message>
          ) : (
            ''
          )}
        </>
      )}
    </>
  );
};

export default MetadataCards;
