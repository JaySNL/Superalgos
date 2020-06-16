function newNodesRunning () {
  const MODULE_NAME = 'Nodes Running'
  const logger = newWebDebugLog()
  logger.fileName = MODULE_NAME

  let thisObject = {
    onRecordChange: onRecordChange,
    initialize: initialize,
    finalize: finalize
  }

  let hiriarchyMap
  return thisObject

  function finalize () {
    hiriarchyMap = undefined
  }

  function initialize (pRootNode) {
    let rootNode = canvas.designSpace.workspace.getHierarchyHeadsById(pRootNode.id)
    hiriarchyMap = getHiriarchyMap(rootNode)
  }

  function onRecordChange (currentRecord) {
    if (currentRecord === undefined) { return }
    let array = currentRecord.running
    if (array === undefined) { return }
    for (let i = 0; i < array.length; i++) {
      let arrayItem = array[0]
      let nodeId = arrayItem[0]
      let value = arrayItem[1]
      applyValue(nodeId, value)
    }
  }

  function applyValue (nodeId, value) {
    let node = hiriarchyMap.get(nodeId)
    if (node.payload === undefined) { return }
    if (node.payload.uiObject === undefined) { return }
    if (value === true) { value = 'true' }
    if (value === false) { value = 'false' }
    node.payload.uiObject.runningAtBackend()
  }
}

