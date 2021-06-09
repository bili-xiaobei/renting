'use strict';
const db = uniCloud.database()
const _ = db.command
exports.main = async (event, context) => {
	const list = db.collection(event.db)
	const res = await list.update({
		'detail_room': _.push(event.data)
	})
	
	//返回数据给客户端
	return res
};
