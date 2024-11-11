import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storage.config";

export async function groupGetAll() {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
    const groups: string[] = storage ? JSON.parse(storage) : [];

    console.log("groupGetAll()", groups);

    return groups;
  } catch (error) {
    throw error;
  }
}
