/**
 * @Name: AsyncStorage
 * @Author: jiao.shen
 * @Description: 异步存储
 */

var AsyncStorage = {
    /**
   * Fetches an item for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param key Key of the item to fetch.
   * @param callback Function that will be called with a result if found or
   *    any error.
   * @returns A `Promise` object.
   */
  
  getItem: function(
      key: string,
      callback?: ?(error: ?Error, result: ?string) => void
  ): Promise {
      return new Promise((resolve, reject) => {
          var value = window.localStorage.getItem(key);
          callback && callback(null, value);
          if (!value) reject(new Error("出错了"));
          else resolve(value)
      });
  },

  /**
   * Sets the value for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param key Key of the item to set.
   * @param value Value to set for the `key`.
   * @param callback Function that will be called with any error.
   * @returns A `Promise` object.
   */
  setItem: function(
    key: string,
    value: string,
    callback?: ?(error: ?Error) => void
  ): Promise {
    return new Promise((resolve, reject) => {
      var error = window.localStorage.setItem(key, value);
          callback && callback(error);
          if (error) reject(error);
          else resolve(null)
     });
  },

  /**
   * Removes an item for a `key` and invokes a callback upon completion.
   * Returns a `Promise` object.
   * @param key Key of the item to remove.
   * @param callback Function that will be called with any error.
   * @returns A `Promise` object.
   */
  removeItem: function(
    key: string,
    callback?: ?(error: ?Error) => void
  ): Promise {
    return new Promise((resolve, reject) => {
        var error = window.localStorage.removeItem(key);
          callback && callback(error);
          if (error) reject(error);
          else resolve(null)
    })
  }

}

module.exports = AsyncStorage;