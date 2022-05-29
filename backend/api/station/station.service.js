const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(queryParams) {
  // const MAX_PAGE_SIZE = 15
  console.log(queryParams);
  const { filterBy, pageSize } = queryParams
  const collection = await dbService.getCollection('station')
  const stationAmount = await collection.estimatedDocumentCount()
  try {
    if (filterBy) {
      const { filterCriteria } = _buildCriteria(
        JSON.parse(filterBy),
        pageSize,
        stationAmount,
        // MAX_PAGE_SIZE
      )
    }


    const stations = await collection
      .find()
      // .sort(sortCriteria)
      // .skip(startIdx)
      // .limit(pageSize)
      .toArray()
    return stations
  } catch (err) {
    logger.error('cannot find stations', err)
    throw err
  }
}

async function getById(stationId) {
  try {
    const collection = await dbService.getCollection('station')

    const station = collection.findOne({ _id: ObjectId(stationId) })
    return station
  } catch (err) {
    logger.error(`while finding station ${stationId}`, err)
    throw err
  }
}

async function remove(stationId) {
  try {
    const collection = await dbService.getCollection('station')
    await collection.deleteOne({ _id: ObjectId(stationId) })
    return stationId
  } catch (err) {
    logger.error(`cannot remove station ${stationId}`, err)
    throw err
  }
}

async function add(station) {
  try {
    const collection = await dbService.getCollection('station')
    station.createdAt = Date.now()
    await collection.insertOne(station)
    return station
  } catch (err) {
    logger.error('cannot insert station', err)
    throw err
  }
}
async function update(station) {
  try {
    var id = ObjectId(station._id)
    delete station._id
    const collection = await dbService.getCollection('station')
    await collection.updateOne({ _id: id }, { $set: { ...station } })
    return station
  } catch (err) {
    logger.error(`cannot update station ${stationId}`, err)
    throw err
  }
}

async function saveMsgToHistory(stationId, msg) {
  try {
    var id = ObjectId(stationId)
    const collection = await dbService.getCollection('station')
    await collection.updateOne({ _id: id }, { $push: { chatHistory: msg } })
  } catch (err) {
    logger.error(`cannot update station ${stationId}`, err)
    throw err
  }
}

function _buildCriteria(filterBy, pageSize) {
  const { name, addedAt, tags, sortBy, addedBy, duration } = filterBy
  const filterCriteria = {}
  let sortCriteria, pageCriteria
  if (name) filterCriteria.name = { $regex: name, $options: 'i' }
  if (addedBy) filterCriteria.addedBy = { $regex: addedBy, $options: 'i' }
  if (addedAt) filterCriteria.addedAt = JSON.parse(addedAt)
  if (tags.length) filterCriteria.tags = { $in: [...tags] }
  // switch (sortBy) {
  //   case 'priceAscending':
  //     sortCriteria = { price: 1 }
  //     break
  //   case 'priceDescending':
  //     sortCriteria = { price: -1 }
  //     break
  //   default:
  //     sortCriteria = { name: 1 }
  // }



  return { filterCriteria }
}

module.exports = {
  remove,
  query,
  getById,
  add,
  update,
  saveMsgToHistory,
}