const secrets = {
  email: 'calculatemateweb@gmail.com',
  password: 'CalculateKitty45!',
};

export default function getSecret(key: string): string {
  return secrets[key];
}
