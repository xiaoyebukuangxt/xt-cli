import fetch from 'api/fetch';
const debug = process.env.NODE_ENV !== 'production';
//新增布控
const addControl = function (data) {
    const url = (debug ? '/api/' : '') + 'home/getBzryProject.do'
    return fetch({
        url,
        method: 'POST',
        params: data
    })
};


export {addControl};
