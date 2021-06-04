'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('list') // 获取表'unicloud-test'的集合对象
	const res = await collection.where({
		name: event.name
	}).limit(10).get() // 获取表中的10条数据，结果为json格式
	//返回数据给客户端
	return {
		event,
		res
	}
};
