import mongodb from "mongodb";

function getClient() {
    const uri = "mongodb+srv://admin:zbvorZuQOGsZmW6e@cluster0.hzmu1.mongodb.net/?retryWrites=true&w=majority";
    return new mongodb.MongoClient(uri);
}

export {getClient}