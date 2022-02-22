module.exports = mongoose => {
    const Order = mongoose.model(
        "order",
        mongoose.Schema(
            {
                address: {
                    type: mongoose.Schema.Types.ObjectId,
                    require: true,
                    ref: "address",
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    require: true,
                    ref: "product",
                },
                quantity: {
                    type: Number,
                    require: true,
                    
                },

                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    require: true,
                    ref: "user",
                }
            },
          {timestamps:true}

        )
    );

    return Order;
};