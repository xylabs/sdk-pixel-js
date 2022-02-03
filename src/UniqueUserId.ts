import randomBytes from 'randombytes'

export class UniqueUserId {
  private static localStorageId = '_coin_cid'
  public id: string
  constructor() {
    this.id = window.localStorage.getItem(UniqueUserId.localStorageId) ?? this.generateId()
    window.localStorage.setItem(UniqueUserId.localStorageId, this.id)
  }
  private generateId() {
    return randomBytes(16).toString('base64')
  }

  public toString() {
    return this.id
  }
}
