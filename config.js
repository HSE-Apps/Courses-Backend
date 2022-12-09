const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const client = new SecretManagerServiceClient();

exports.config = {};

exports.setConfig = async () => {
  try {
    const [mongoUri] = await client.accessSecretVersion({
      name: "projects/hse-courses-123/secrets/MONGO_URI/versions/latest",
    });

    exports.config = { mongoUri: mongoUri.payload.data.toString() };
  } catch (err) {
    console.log(err);
  }
};
