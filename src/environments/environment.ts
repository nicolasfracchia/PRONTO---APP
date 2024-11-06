import { EnvironmentConfig } from "src/app/interfaces/environment-config";

const currentEnvironment = 'production';

const development: EnvironmentConfig = {
  production: false,
  apiURL: 'http://127.0.0.1:3000/',
  public_folder_URL: 'http://127.0.0.1:3000/public/',
  food_images_URL: 'http://127.0.0.1:3000/public/images/products/',
  default_food_image_URL: 'assets/images/food/default.png'
}

const production: EnvironmentConfig = {
  production: true,
  apiURL: 'http://89.116.51.176:3000/',
  public_folder_URL: 'http://89.116.51.176:3000/public/',
  food_images_URL: 'http://89.116.51.176:3000/public/images/products/',
  default_food_image_URL: 'assets/images/food/default.png',
}

const environments: Map<string, EnvironmentConfig> = new Map([
  ['development', development],
  ['production', production]
]);


export const environment: EnvironmentConfig = environments.get(currentEnvironment) || development;