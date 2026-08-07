import AsyncStorage from '@react-native-async-storage/async-storage';

export const IP_PREDETERMINADA = '10.120.166.147';
export const PUERTO_API = '5000';

const CLAVE_IP = '@usuarioApi:ip';

export const esIpValida = (ip) => {
  const partes = ip.trim().split('.');

  return partes.length === 4 && partes.every((parte) => {
    if (!/^\d{1,3}$/.test(parte)) return false;
    const numero = Number(parte);
    return numero >= 0 && numero <= 255;
  });
};

export const obtenerIpApi = async () => {
  const ipGuardada = await AsyncStorage.getItem(CLAVE_IP);
  return ipGuardada || IP_PREDETERMINADA;
};

export const guardarIpApi = async (ip) => {
  const ipLimpia = ip.trim();

  if (!esIpValida(ipLimpia)) {
    throw new Error('Escribe una dirección IPv4 válida, por ejemplo 192.168.1.10.');
  }

  await AsyncStorage.setItem(CLAVE_IP, ipLimpia);
  return ipLimpia;
};

export const restaurarIpApi = async () => {
  await AsyncStorage.removeItem(CLAVE_IP);
  return IP_PREDETERMINADA;
};

export const obtenerUrlUsuarios = async (ruta = '') => {
  const ip = await obtenerIpApi();
  return `http://${ip}:${PUERTO_API}/v1/usuarios${ruta}`;
};
