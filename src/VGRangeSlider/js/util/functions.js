function getDataAttributes(el) {
	let data = {};
	[].forEach.call(el.attributes, function(attr) {
		if (/^data-/.test(attr.name)) {
			let camelCaseName = attr.name.substr(5).replace(/-(.)/g, function ($0, $1) {
				return $1.toUpperCase();
			});
			data[camelCaseName] = attr.value;
		}
	});
	return data;
}

function deepMergeObjects (...objects) {
	const _this = this;

	const isObject = obj => obj && typeof obj === 'object';

	return objects.reduce((prev, obj) => {
		Object.keys(obj).forEach(key => {
			const pVal = prev[key];
			const oVal = obj[key];

			if (Array.isArray(pVal) && Array.isArray(oVal)) {
				prev[key] = pVal.concat(...oVal);
			}
			else if (isObject(pVal) && isObject(oVal)) {
				prev[key] = _this.merge(pVal, oVal);
			}
			else {
				prev[key] = oVal;
			}
		});

		return prev;
	}, {});
}

function removeElementArray(arr, el) {
	let what, a = arguments, L = a.length, ax;
	while (L > 1 && arr.length) {
		what = a[--L];
		while ((ax= arr.indexOf(what)) !== -1) {
			arr.splice(ax, 1);
		}
	}
	return arr;
}

export {getDataAttributes, deepMergeObjects, removeElementArray};
