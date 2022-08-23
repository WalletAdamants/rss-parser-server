const LINK_TAG = '<link>';
const DESCR_TAG = '<description>';
const CREATOR_INNER = 'dc:creator';

function getLink(itemStr) {
  if (typeof itemStr !== 'string') {
    return '';
  }

  const startIdx = itemStr.indexOf(LINK_TAG);
  const endIdx = itemStr.indexOf(DESCR_TAG);

  if (startIdx === -1 || endIdx == -1) {
    return '';
  }
  return itemStr.slice(startIdx + LINK_TAG.length, endIdx);
}

function getImgAndDescription(itemStr) {
  if (typeof itemStr !== 'string') {
    return '';
  }

  let description = '';
  let image = '';

  const descrStartIdx = itemStr.indexOf('<p>');
  const descrEndIdx = itemStr.indexOf('</p>', descrStartIdx);

  const imgStartIdx = itemStr.indexOf('<img src="');
  const imgEndIdx = itemStr.indexOf('" /--><', imgStartIdx);

  if (descrStartIdx !== -1 && descrEndIdx !== -1) {
    description = itemStr.slice(descrStartIdx + '<p>'.length, descrEndIdx);
  }

  if (imgStartIdx !== -1 && imgEndIdx !== -1) {
    image = itemStr.slice(imgStartIdx + '<img src="'.length, imgEndIdx);
  }

  return { description, image };
}

function getAuthor(itemStr) {
  if (typeof itemStr !== 'string') {
    return '';
  }

  const startIdx = itemStr.indexOf(CREATOR_INNER);
  const endIdx = itemStr.indexOf(CREATOR_INNER, startIdx + 1);

  if (startIdx === -1 || endIdx === -1) {
    return '';
  }
  return itemStr
    .slice(startIdx + CREATOR_INNER.length + 1, endIdx)
    .replace('<!--[CDATA[', '')
    .replace(']]--></', '');
}

function getNormalStr(itemStr) {
  if (typeof itemStr !== 'string') {
    return '';
  }

  return itemStr.replace('<![CDATA[', '').replace(']]>', '');
}

module.exports = { getLink, getAuthor, getNormalStr, getImgAndDescription };
