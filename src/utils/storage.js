/**
 * gets an array of objects or an empty array from localStorage
 * @param {String} storageName the name of the localStorage to retrieve
 * @returns {Array} an array of objects from localStorage
 */
export const getLocalStorage = (storageName) => {
  return JSON.parse(localStorage.getItem(storageName)) || [];
};

/**
 * saves an array of objects to the local storage
 * @param {String} storageName the name of the localStorage to save at
 * @param {Array} storageArray the Array to save
 */
export const saveLocalStorage = (storageName, storageArray) => {
  localStorage.setItem(storageName, JSON.stringify(storageArray));
};

/**
 * Checks if a particular entry is already stored in localStorage
 * @param {String} storageName the name of the localStorage to search in
 * @param {Object} storageItem the item to search for
 * @returns {boolean}
 */
export const isStored = (storageName, storageItem) => {
  const storage = getLocalStorage(storageName);
  return storage.some((item) => item.id === storageItem.id);
};

/**
 * Adds an item to the beginning of a corresponding localStorage
 * @param {String} storageName the name of the localStorage to add an item to
 * @param {Object} storageItem the item to add to localStorage
 */
export const addToStorage = (storageName, storageItem) => {
  const storage = getLocalStorage(storageName);
  const updatedStorage = [storageItem, ...storage];
  saveLocalStorage(storageName, updatedStorage);
};

/**
 * Removes an item out of a corresponding localStorage
 * @param {String} storageName the name of the localStorage to remove the item from
 * @param {Object} storageItem the item to remove from localStorage
 */
export const removeFromStorage = (storageName, storageItem) => {
  const storage = getLocalStorage(storageName);
  const updatedStorage = storage.filter((item) => item.id !== storageItem.id);
  saveLocalStorage(storageName, updatedStorage);
};