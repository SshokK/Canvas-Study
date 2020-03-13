export const getPathsFromSvgString = (string) => {
  const pathRegExp = /\<path.*?\>/ig
  const paths = []

  let match

  while ((match = pathRegExp.exec(string)) !== null){
    const pathTag = match[0]
    const dAttrRegExp = /d="(.*?)"/ig;
    const dAttrValue = dAttrRegExp.exec(pathTag)[1]
    paths.push(dAttrValue)
  }

  return paths
}
