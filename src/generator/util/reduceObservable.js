const Subject = require('rxjs').Subject

const reduceObservable = (reducer, starter, observable$) => {
  let dataToReturn
  const data$ = new Subject()

  observable$
    .scan(
      reducer,
      starter
    )
    .subscribe(
      (data) => {
        dataToReturn = data
      },
      (error) => {
        data$.error(error)
      },
      () => {
        data$.next(dataToReturn)
        data$.complete()
      }
    )

  return data$
}

module.exports = reduceObservable
