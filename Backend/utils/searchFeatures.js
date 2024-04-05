// class SearchFeatures {
//     constructor(query, queryString) {
//         this.query = query
//         this.queryString = queryString
//     }

//     search() {
//         const keyword = this.queryString.keyword ? {
//             name: {
//                 $regex: this.queryString.keyword,
//                 $options: "i",
//             }
//         } : {};

//         // console.log(keyword);

//         this.query = this.query.find({ ...keyword });
//         return this;
//     }

//     filter() {
//         const queryCopy = { ...this.queryString }

//         // fields to remove for category
//         const removeFields = ["keyword", "page", "limit"];

//         // console.log(queryCopy);
//         removeFields.forEach(key => delete queryCopy[key]);
//         // console.log(queryCopy);

//         // price filter
//         let queryString = JSON.stringify(queryCopy);
//         queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

//         // console.log(JSON.parse(queryString));

//         this.query = this.query.find(JSON.parse(queryString));
//         return this;
//     }

//     pagination(resultPerPage) {
//         const currentPage = Number(this.queryString.page) || 1;

//         const skipProducts = resultPerPage * (currentPage - 1);

//         this.query = this.query.limit(resultPerPage).skip(skipProducts);
//         return this;
//     }
// };

// module.exports = SearchFeatures;


// class SearchFeatures {
//     constructor(query, queryString) {
//         this.query = query
//         this.queryString = queryString
//     }

//     search() {
//         const keyword = this.queryString.keyword ? {
//             name: {
//                 $regex: this.queryString.keyword,
//                 $options: "i",
//             }
//         } : {};

//         this.query = this.query.find({ ...keyword });
//         return this;
//     }

//     filter() {
//         const queryCopy = { ...this.queryString }

//         // fields to remove for category
//         const removeFields = ["keyword", "page", "limit"];

//         removeFields.forEach(key => delete queryCopy[key]);

//         // Handle category filter
//         const categoryFilter = queryCopy.category
//             ? { category: queryCopy.category }
//             : {};

//         delete queryCopy.category;

//         // Price filter
//         let queryString = JSON.stringify(queryCopy);
//         queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

//         this.query = this.query.find({ ...JSON.parse(queryString), ...categoryFilter });

//         return this;
//     }

//     pagination(resultPerPage) {
//         const currentPage = Number(this.queryString.page) || 1;

//         const skipProducts = resultPerPage * (currentPage - 1);

//         this.query = this.query.limit(resultPerPage).skip(skipProducts);
//         return this;
//     }
// };

// module.exports = SearchFeatures;


class SearchFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    search() {
        const keyword = this.queryString.keyword ? {
            $or: [
                { name: { $regex: this.queryString.keyword, $options: "i" } },
                { brand: { $regex: this.queryString.keyword, $options: "i" } },
                { category: { $regex: this.queryString.keyword, $options: "i" } }
            ]
        } : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString }

        // Fields to remove for category
        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        // Include category filter
        if (queryCopy.category) {
            this.query = this.query.find({ category: queryCopy.category });
            delete queryCopy.category;
        }

        // Price filter remains unchanged
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find({ ...JSON.parse(queryString) });

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryString.page) || 1;

        const skipProducts = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skipProducts);
        return this;
    }
}

module.exports = SearchFeatures;
