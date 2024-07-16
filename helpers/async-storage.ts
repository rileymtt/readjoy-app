import AsyncStorage from "@react-native-async-storage/async-storage";

const storeKey = "@MyReadJoy";

export default {
  set: async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(`${storeKey}:${key}`, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  },
  get: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(`${storeKey}:${key}`);
      if (value) {
        return JSON.parse(value);
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  },
  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(`${storeKey}:${key}`);
    } catch (error) {
      console.error(error);
    }
  },
};
