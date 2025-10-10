// swagger.js
import YAML from 'yamljs';

const getSwaggerSpec = (serverUrl) => {
  const swaggerDocument = YAML.load('./swagger.yaml');
  swaggerDocument.servers = [{ url: serverUrl }];
  return swaggerDocument;
};

export default getSwaggerSpec;
