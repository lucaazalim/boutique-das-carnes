const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

module.exports = function getPagination(query) {

    var pagination;

    if (query.page || query.page_size) {

        const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
        const limit = Math.abs(query.page_size) || DEFAULT_PAGE_LIMIT;

        const offset = (page - 1) * limit;

        return {
            offset,
            limit
        };

    } else {

        return {
            offset: 0,
            limit: 500
        };

    }

};
