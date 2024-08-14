export class UniqueUserId {
  private static localStorageId = '_coin_cid'
  id: string

  constructor() {
    this.id = window.localStorage.getItem(UniqueUserId.localStorageId) ?? this.generateId()
    window.localStorage.setItem(UniqueUserId.localStorageId, this.id)
  }

  toString() {
    return this.id
  }

  private generateId() {
    return crypto.randomUUID()
  }
}
