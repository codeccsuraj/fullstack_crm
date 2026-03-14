import cors from 'cors';

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

const corsOptions = {
    origin: (origin, callback) => {
        // allow server-to-server or postman requests
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy: Access denied"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With"
    ],
    credentials: true,

    optionsSuccessStatus: 200
}

export default cors(corsOptions);