

module.exports = mongoose => {
    const Product = mongoose.model(
        "product",
        mongoose.Schema(
            {
                id:Number,
                name: { type: String,default: ""},
                category: { type: String, default: ""},
                manufacturer: { type: String, required: true ,default:""},
                availableItems: { type: Number, required: true },
                price: { type: Number, required: true ,default:""},
                imageURL: String,
                description: { type: String },
               

            },
            { timestamps: true }
        )
    );

    return Product;
};