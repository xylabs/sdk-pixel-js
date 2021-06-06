import StandardEvent from './StandardEvent'

class CoinStandardEvents<T> {
  public pageView() {
    return new StandardEvent<T>('page_view')
  }
}

export default CoinStandardEvents
