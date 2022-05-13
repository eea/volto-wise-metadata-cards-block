import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Modal } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { Icon } from '@plone/volto/components';
import shareSVG from '@plone/volto/icons/share.svg';
import MapPreview from './MapPreview';
import { getPath, useCopyToClipboard, formatItemType } from '../../utils';

const EEA_LICENSE =
  'EEA standard re-use policy: unless otherwise indicated, ' +
  're-use of content on the EEA website for commercial or ' +
  'non-commercial purposes is permitted free of charge, ' +
  'provided that the source is acknowledged ' +
  '(https://www.eea.europa.eu/legal/copyright)';

const MetadataModal = (props) => {
  const { settings } = config;
  const { isOpen, isOnClose, item = {}, token } = props;
  const source = item?.source?.[0] || item;
  const {
    description,
    lineage,
    embed_url,
    webmap_url,
    license_copyright,
    publisher,
    dpsir_type,
    report_type,
    original_source,
    temporal_coverage,
    geo_coverage,
    category,
    publication_year,
    legislative_reference,
  } = source || [];

  const subject = source.Subject || source.subjects;
  const type = item?.source?.[0]['@type'] || item['@type'];
  const url = item?.source ? item.source[0]['@id'] : item['@id'];
  const item_path = getPath(source.getURL).replace('/api', '');
  const share_url = settings.publicURL + item_path;
  const copyright =
    license_copyright === 'EEA' ? EEA_LICENSE : license_copyright;

  const [copyUrlStatus, copyUrl] = useCopyToClipboard(share_url);
  const [confirmationText, setConfirmationText] = React.useState(false);

  React.useEffect(() => {
    if (copyUrlStatus === 'copied') {
      setConfirmationText('Share URL is copied to clipboard.');
    } else if (copyUrlStatus === 'failed') {
      setConfirmationText('Copy failed. Please try again.');
    }
  }, [copyUrlStatus]);

  return (
    <>
      <Modal
        className="item-metadata-modal"
        open={isOpen}
        onClose={isOnClose}
        size="large"
        closeIcon
        centered
      >
        <Modal.Header>
          <div className="item-metadata-top">
            {type && (
              <div className="metadata-tab-section item-snippet-type">
                <span className="metadata-tab-title">Item: </span>
                <span>{formatItemType(type)}</span>
              </div>
            )}

            {category && category.length > 0 && (
              <div className="metadata-tab-section">
                <span className="metadata-tab-title">Topics: </span>
                {Array.isArray(category) ? (
                  <>
                    {category.map((topic, i) => (
                      <span key={i}>
                        {topic}
                        {i < category.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </>
                ) : (
                  <span>{category}</span>
                )}
              </div>
            )}

            {publication_year && (
              <div className="metadata-tab-section">
                <span className="metadata-tab-title">Publication year: </span>
                <span>{publication_year}</span>
              </div>
            )}

            {legislative_reference && legislative_reference.length > 0 && (
              <div className="metadata-tab-section">
                <span className="metadata-tab-title">
                  Legislative reference:{' '}
                </span>
                {Array.isArray(legislative_reference) ? (
                  <>
                    {legislative_reference.map((tag, i) => (
                      <span key={i}>
                        {tag.title || tag}
                        {i < legislative_reference.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </>
                ) : (
                  <span>
                    {legislative_reference.title || legislative_reference}
                  </span>
                )}
              </div>
            )}
          </div>
          {token ? (
            <Link to={url || ''}>
              <h3>{item.title}</h3>
            </Link>
          ) : (
            <h3>{item.title}</h3>
          )}
        </Modal.Header>

        <Modal.Content>
          <div className="metadata-icons">
            <div className="toolbar-button-wrapper">
              <Button
                className="toolbar-button"
                title="Share"
                onClick={copyUrl}
              >
                <Icon name={shareSVG} size="26px" />
              </Button>
              <span className="btn-text">Share</span>
            </div>

            {(embed_url || webmap_url) && (
              <div className="map-preview">
                <MapPreview
                  item={item}
                  tableau_url={embed_url}
                  map_url={webmap_url}
                />
              </div>
            )}
          </div>

          <div className="item-metadata-table">
            <Table celled definition basic="very">
              <Table.Body>
                {source && (
                  <>
                    {description && (
                      <Table.Row>
                        <Table.Cell>Description</Table.Cell>
                        <Table.Cell>
                          {description}
                          {lineage && (
                            <p style={{ paddingTop: '1rem' }}>{lineage}</p>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    )}

                    {temporal_coverage &&
                      Object.keys(temporal_coverage).length > 0 && (
                        <Table.Row>
                          <Table.Cell>Temporal coverage</Table.Cell>
                          <Table.Cell>
                            <div className="tag-types">
                              {temporal_coverage.temporal.map((temp, i) => (
                                <div key={i}>
                                  <p>{temp.label}</p>
                                </div>
                              ))}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      )}

                    {geo_coverage && Object.keys(geo_coverage).length > 0 && (
                      <Table.Row>
                        <Table.Cell>Spatial coverage</Table.Cell>
                        <Table.Cell>
                          <div className="geo-tags tag-types">
                            {geo_coverage.geolocation.map((geo, i) => (
                              <div key={i}>
                                <p>{geo.label}</p>
                              </div>
                            ))}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}

                    {publisher && (
                      <Table.Row>
                        <Table.Cell>Organisation</Table.Cell>
                        <Table.Cell>
                          {publisher.title || source.publisher}
                        </Table.Cell>
                      </Table.Row>
                    )}

                    {original_source && (
                      <Table.Row>
                        <Table.Cell>Source</Table.Cell>
                        <Table.Cell>
                          <a
                            href={original_source}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {original_source}
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    )}

                    {license_copyright && (
                      <Table.Row>
                        <Table.Cell>Rights</Table.Cell>
                        <Table.Cell>{copyright}</Table.Cell>
                      </Table.Row>
                    )}

                    {subject && subject.length > 0 && (
                      <Table.Row>
                        <Table.Cell>Keywords</Table.Cell>
                        <Table.Cell>
                          <div className="tag-types">
                            {subject.map((tag, i) => (
                              <div key={i}>
                                <p>{tag}</p>
                              </div>
                            ))}
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )}

                    {dpsir_type && (
                      <Table.Row>
                        <Table.Cell>DPSIR</Table.Cell>
                        <Table.Cell>
                          {dpsir_type.title || dpsir_type}
                        </Table.Cell>
                      </Table.Row>
                    )}

                    {report_type && (
                      <Table.Row>
                        <Table.Cell>Report type</Table.Cell>
                        <Table.Cell>
                          {report_type.title || source.report_type}
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </>
                )}
              </Table.Body>
            </Table>
          </div>

          {copyUrlStatus === 'copied' && (
            <div className="copy-box">{confirmationText}</div>
          )}
        </Modal.Content>
      </Modal>
    </>
  );
};
export default compose(
  connect((state) => ({
    token: state.userSession.token,
  })),
)(MetadataModal);
