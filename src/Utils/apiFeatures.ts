class ApiFeatures {
    private dbQueryBulder: any;

    private reqQuery: any;

    constructor(dbQueryBulder: any, reqQuery: any) {
        this.dbQueryBulder = dbQueryBulder;
        this.reqQuery = reqQuery;
    }

    filter() {
        // filtering
        const queryObj = { ...this.reqQuery };
        const excludeValues = ['limit', 'page', 'fields', 'sort'];
        excludeValues.forEach((el) => delete queryObj[el]);

        // advance filtering
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );
        this.dbQueryBulder.find(JSON.parse(queryString));
        return this;
    }

    // sorting
    sort() {
        if (this.reqQuery.sort) {
            const sortBy = this.reqQuery.sort.split(',').join(' ');
            this.dbQueryBulder = this.dbQueryBulder.sort(sortBy);
        } else {
            this.dbQueryBulder = this.dbQueryBulder.sort('-createdAt');
        }
        return this;
    }

    limit() {
        // field limiting or projecting
        if (this.reqQuery.fields) {
            const fields = this.reqQuery.fields.split(',').join(' ');
            this.dbQueryBulder = this.dbQueryBulder.select(fields);
        } else {
            this.dbQueryBulder = this.dbQueryBulder.select('-__v');
        }
        return this;
    }

    paginate() {
        // pagination
        const page = parseInt(this.reqQuery.page, 10) || 1;
        const limit = parseInt(this.reqQuery.limit, 10) || 100;
        const skip = (page - 1) * limit;

        this.dbQueryBulder = this.dbQueryBulder.skip(skip).limit(limit);
        return this;
    }

    get getDbQuery() {
        return this.dbQueryBulder;
    }
}
export default ApiFeatures;
